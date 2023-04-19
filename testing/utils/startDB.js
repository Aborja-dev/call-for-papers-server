import { usersWithHash } from "../../mocks/users"
import { User } from "../../models/User"

const clearDB = async () => {
    await User.deleteMany({})
}

const fillDB = async () => {
    await User.insertMany(usersWithHash)
}

export const startDB = async () => {
    await clearDB()
    await fillDB()
}