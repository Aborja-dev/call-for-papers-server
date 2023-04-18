import { User } from "../../models/User"

export const getAnId = async () => {
    const response = await User.findOne({})
    const user = response.toJSON()
    return user.id
}

export const getAndMap = async ({model, property}) => {
    const response = await model.find({})
    const responseMap = response.map(item => {
        const itemJSON = item.toJSON()
        return itemJSON[property]
    })
    return responseMap
}

export const getAll = async (model) => {
    const response = await model.find({})
    const collection = response.toJSON()
    return collection
}