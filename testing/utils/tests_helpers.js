import { User } from "../../models/User.js"

export const getAnId = async () => {
    const response = await User.findOne({})
    const user = response.toJSON()
    return user.id
}

export const getAnIdFromModel = async (model) => {
    const response = await model.findOne({})
    const user = response.toJSON()
    return user.id
}

export const getAndMap = async ({ model, property, query = {} }) => {
    try {
        const response = await model.find(query)
        const responseMap = response.map(item => {
            const itemJSON = item.toJSON()
            return itemJSON[property]
        })
        return responseMap
    } catch (error) {
        throw new Error(error)
    }
}

export const getJSONCOllection = async (model, query) => {
    const collection = await model.find(query)
    return collection.map(element => element.toJSON())
}

export const getAll = async (model) => {
    const response = await model.find({})
    const collection = response.map(element => element.toJSON())
    return collection
}

export const findInDB = async (model, query={}) => {
    const response = await model.find(query)
    if (response.length === 1) {
        return response[0].toJSON()
    } 
    const collection = response.map(element => element.toJSON())
    return collection
}

export const choice = (arr) => {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}