import jwt from "jsonwebtoken"
import {errorHandler} from "./error.js"

export const verifyToken = (req, res,next)=>{
    const token = req.cookies.access_token;
    // console.log(token);
    
    if(!token){
        return next(errorHandler(400,"No token, authorization denied!"));
    }
    jwt.verify(token,process.env.JWT_SEC,(err,payload)=>{
        if(err){
            // console.log(err);
            return next(errorHandler(403,"Token is invalid!"));
        }
        // console.log(user);
        req.user = payload.id
        next();
    })
}