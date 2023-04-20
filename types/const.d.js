import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT
export const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI
export const MONGODB_DEV_URI = process.env.MONGODB_DEV_URI
export const USER_TYPES_ENUM = ['ADMINISTRADOR', 'ORGANIZADOR', 'HABLANTE', 'USUARIO']
export const SECRET = process.env.SECRET
export const STATUS_PROPOSAL_ENUM = ['ENVIADA', 'ESPERA', 'PRESELECCION', 'APROBADA', 'RECHAZADA']