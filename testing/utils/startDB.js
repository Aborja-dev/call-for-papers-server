import mongoose from "mongoose"
import { User } from "../../models/User.js"
import { Proposal } from "../../models/TalkProposal.js"

import { usersWithHash } from "../../mocks/users.js"
import { proposals } from "../../mocks/proposals.js"

import { MONGODB_TEST_URI, USER_TYPES_ENUM } from "../../types/const.d.js"
import { getJSONCOllection, choice } from "./tests_helpers.js"
// Limpiar la base de datos
const clearDB = async () => {
    await User.deleteMany({})
    await Proposal.deleteMany({})
}

// cargar una coleccion con una serie de datos
const fillDB = async (model, array) => {
    await model.insertMany(array)
}

// pasos para insertar un usuario en cada proposal

const addUserForInsert = async (type) => {
    const listOfUser = await getJSONCOllection(User, { type: type })
    const proposalMap = proposals.map(proposal => {
        const userId = choice(listOfUser)
        return {
            ...proposal,
            proponent: userId.id
        }
    })
    return proposalMap
}

// iniciar la base de datos

export const startDB = async () => {
    try {
        await clearDB();
        await fillDB(User, usersWithHash);
        const proposals = await addUserForInsert(USER_TYPES_ENUM[2]);
        await fillDB(Proposal, proposals);
        console.log('La carga ha sido finalizada con éxito');
    } catch (error) {
        console.error(`Se encontró un error al intentar cargar la base de datos: ${error}`);
        process.exit(1); // Salir del proceso con un código de error
    } finally {
        mongoose.connection.close(); // Cerrar la conexión de Mongoose
    }
};

// ejecutar solo este archivo (usar solo cuando se compruebe la integridad de la carga)

if (process.env.NODE_ENV === 'testingDB') {
    mongoose
        .connect(MONGODB_TEST_URI)
        .then(() => {
            console.log('Base de datos conectada con éxito');
            return startDB(); // Devolver una promesa para poder manejar errores en startDB
        })
        .then(() => {
            console.log('La carga de datos ha sido finalizada con éxito');
        })
        .catch((error) => {
            console.error(`Se produjo un error al intentar conectar con el servidor MongoDB: ${error}`);
            process.exit(1); // Salir del proceso con un código de error
        });
}