import jwt from "jsonwebtoken"
import {errorHandler} from "./error.js"
import User from "../models/userModel.js"

export const verifyToken = async(req, res,next)=>{
    const token = req.cookies.access_token;
    // console.log(token);
    
    if(!token){
        return next(errorHandler(400,"No token, authorization denied!"));
    }
    jwt.verify(token,process.env.JWT_SEC,async(err,payload)=>{
        if(err){
            // console.log(err);
            return next(errorHandler(403,"Token is invalid!"));
        }
        // console.log(user);
        const user = await User.findOne({_id:payload.id})
        req.user = user
        next();
    })
}