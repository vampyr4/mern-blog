import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app = express()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database is up and running!")
})
app.listen(5000,()=>{
    console.log("Server is running on port:5000")
})  