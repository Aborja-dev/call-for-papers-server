import mongoose from "mongoose";
import { MONGODB_DEV_URI, MONGODB_TEST_URI } from "../types/const.d.js";
let mongoUrl = ''

if (process.env.NODE_ENV === 'development') {
    mongoUrl = MONGODB_DEV_URI
}
if (process.env.NODE_ENV === 'testing') {
    mongoUrl = MONGODB_TEST_URI
}

export const mongoConnection = mongoose.connect(mongoUrl).then(()=>{
    console.log(`conexion a base de datos en ${process.env.NODE_ENV}`)
})