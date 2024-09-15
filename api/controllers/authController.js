import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"

export const SignUp = async(req,res , next)=>{
    const {username,email,password} = req.body
    if(!username || !password || !email){
        return next(errorHandler(400,"All Fields Required!"))
    }
    
    const hashedPassword  = bcryptjs.hashSync(password,10)
    const newUser = new User({username,password:hashedPassword,email})

    //save the user
    try {
        await newUser.save()
        res.status(201).json({message:"User registered successfully"})
    } catch (error) {
        next(error)
    }
}   