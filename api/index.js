import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRouter from "./routes/authRoute.js"
import userRouter from "./routes/userRoutes.js"

dotenv.config()

const app = express()

app.use(express.json())

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database is up and running!")
})

app.listen(5000,()=>{
    console.log("Server is running on port:5000")
})  