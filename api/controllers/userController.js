import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"

export const updateUser = async(req,res,next)=>{
    if(req.user !== req.params.userId){
        return next(errorHandler(401,"Unauthorized"))
    }
    if(req.body.password && req.body.password.length < 6 ){
        return next(errorHandler(400,'Passwords should be more than 6 letters'));
    }
    if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password,10)
    }
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

export const deleteUser = async(req,res,next)=>{
    if(!req.user.isAdmin && req.user !== req.params.userId){
        return next(errorHandler(401,"Unauthorized"))
    }
    try {
        if(req.user.isAdmin){
            await User.findByIdAndDelete(req.params.userId)
            res.status(200).json({message:"User deleted successfully!"})
        }
        else{
            await User.findByIdAndDelete(req.params.userId)
            res.status(200).cookie("access_token","").json({message:"User deleted successfully!"})
        }
    } catch (error) {
        console.log(error);
        return next(errorHandler(500,"Something went wrong!"))
    }
}

export const getUsers = async(req,res,next)=>{
    try {
        const startIndex = parseInt(req.query.startIndex || 0)
        const limit = parseInt(req.query.limit) || 10
        const sortDirection = req.query.sortDirection === 'asc' ? 1:-1
        const users = await User.find().sort({createdAt:sortDirection}).skip(startIndex).limit(limit)
        
        const totalUsers = await User.countDocuments()
        const now = new Date()
        const oneMonthAgo  = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )
        const totalUsersThisMonth = await User.countDocuments({createdAt: {$gte: oneMonthAgo}})
        
        res.status(200).json({users,totalUsers,totalUsersThisMonth})
            
   
    } catch (error) {
        console.log(error);
        
        next(error)
    }
}

export const getUser = async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.userId)
        if(!user){
            res.status(200)
        }
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}