import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import { SECRET } from '../types/const.d.js'

export const authToken = (req, _, next) => {
  // obtener el token
  const authHeader = req.headers.authorization || false
  if (!authHeader) {
    return next()
  }
  const token = authHeader.slice(7)
  // validar el token
  try {
    const tokenDecoded = jwt.verify(token, SECRET)
    // hacer el objeto contexto
    const auth = {
      userId: tokenDecoded.userId,
      type: tokenDecoded.type
    }
    // pasarlo a request
    req.context = { auth }
    next()
  } catch (error) {
    throw new GraphQLError('error de token',
      { code: 'UNAUTHORIZED', extensions: { error } }
    )
  }
}
