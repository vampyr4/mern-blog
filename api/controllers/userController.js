import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"

export const updateUser = async(req,res,next)=>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(401,"Unauthorized"))
    }
    if(req.body.password.length < 6 ){
        return next(errorHandler(400,'Passwords should be more than 6 letters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password,10)
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture || req.user.profilePicture,
                password: req.body.password
            }
        },{new:true})
        res.status(200).json(updateUser)

    } catch (error) {
        next(errorHandler(500,"Something went wrong!"))
    }
}