import { User } from "../../models/User"
import { USER_TYPES_ENUM } from "../../types/const.d"

const getUser = async (type) => {
    try {
        const user = await User.findOne({type: type})
        if (!user) {
            throw new Error(`No se encontró un usuario con tipo ${type}.`)
        }
        const _user = user.toJSON()
        return _user.id
    } catch (error) {
        throw new Error(`No se pudo encontrar el usuario: ${error.message}`)
    }
}

export const authSpeakerContext = async () => {
    const type = USER_TYPES_ENUM[2]
    return {
        contextValue: { auth: {
            userId: await getUser(type),
            type: type
        }}
    }
}

export const authOrganizerContext = async () => {
    const type = USER_TYPES_ENUM[1]
    return {
        contextValue: { auth: {
            userId: await getUser(type),
            type: type
        }}
    }
}