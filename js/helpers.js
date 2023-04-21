import { PERMISSIONS } from '../types/const.d.js'

export const verifyAuth = ({ context = {} }) => {
  const hasAuth = context.hasOwnProperty('auth') || false
  if (!hasAuth) return false
  return true
}

export const allowRole = ({ context }, info) => {
  const resolverName = info.fieldName
  const role = context.auth.type
  if (!role) return false
  const allow = {
    byAll: PERMISSIONS.ALL[resolverName] || false,
    byRole: PERMISSIONS[role][resolverName] || false
  }
  const allowValues = Object.values(allow)
  const isAllowed = allowValues.some(i => i)
  if (!isAllowed) return false
  return true
}

export const convertToADate = (time) => new Date('1970-01-01T' + time)

export const createQuery = (...args) => {
  const queries = {}
  const _args = args[0]
  for (const key in _args) {
    if (Object.hasOwnProperty.call(_args, key)) {
      if (_args[key]) {
        queries[key] = _args[key]
      }
    }
  }
  return queries
}
