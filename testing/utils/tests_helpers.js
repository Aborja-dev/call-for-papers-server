import { User } from "../../models/User.js"
import { server } from "../../setup/setupServer.js"
import { SECRET } from "../../types/const.d.js"
import jwt from 'jsonwebtoken'

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
export const getContext = async () => {
        const query = `
        query Query {
            pruebas {
                context
            }
          }
        `
        const response = await server.executeOperation({query})
        const result = response.body.singleResult.data.pruebas
        return JSON.parse(result.context)
}

export const getResult = (response, property)=>{
    try {
        return response.body.singleResult.data[property]
    } catch (error) {
        throw new Error(error)
    }
}

export const loginForTest = async (username, password) => {
    try {
        //buscar username
   const user = await User.findOne({username})
   if (!user) throw new Error('username error')
   // generar token
   const userForToken = {
       userId: user.id,
       type: user.type
   }
   const token = await jwt.sign(userForToken, SECRET)
   // retornar token
   return {
       role: user.type,
       token
   }   
   } catch (error) {
    throw new Error(error)
   }
}