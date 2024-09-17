import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const SignUp = async (req, res, next) => {
    const { username, email, password } = req.body
    if (!username || !password || !email) {
        return next(errorHandler(400, "All Fields Required!"))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, password: hashedPassword, email })

    //save the user
    try {
        await newUser.save()
        res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        next(error)
    }
}

export const SignIn = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        next(errorHandler(400,"All fields are required!"))
    }

    try{
        const validUser = await User.findOne({email})
        // console.log(validUser);
        
        if(!validUser){
           return next(errorHandler(404,"User not found"))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        // console.log(validPassword);
        
        if(!validPassword){
           return next(errorHandler(401,"Incorrect Password"))
        }
        const token = jwt.sign({
            id: validUser._id
        },process.env.JWT_SEC)

        res.status(200).cookie('access_token',token,{
            httpOnly:true
        }).json({
            success:true,
            validUser
        })
    }
    catch(error){
        next(error)
    }
}

export const google = async(req,res)=>{
    const {email,name,photo} = req.body
    try {
        const user = await User.findOne({email})
        if(user){
            const token = jwt.sign({id: user._id},process.env.JWT_SEC)
            res.status(200).cookie('token',token,{httpOnly:true}).json(user)
        }
        else{
            const generatedPass = Math.random().toString(36).slice(-8)
            const hashedPass = bcryptjs.hashSync(generatedPass,10)
            const newUser = new User({username:name + Math.random().toString(9).slice(-4),email,password:hashedPass,profilePicture:photo})
            await newUser.save()
            const token = jwt.sign({id: newUser._id},process.env.JWT_SEC)
            res.status(201).cookie('access_token',token,{httpOnly:true}).json(newUser)
        }
    } catch (error) {
        next(error)
    }
}