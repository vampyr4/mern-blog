import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"

export const SignUp = async(req,res)=>{
    const {username,email,password} = req.body
    if(!username || !password || !email){
        return res.status(400).json({error:"All fields are required"})
    }
    
    const hashedPassword  = bcryptjs.hashSync(password,10)
    const newUser = new User({username,password:hashedPassword,email})

    //save the user
    try {
        await newUser.save()
        res.status(201).json({message:"User registered successfully"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}   