import Post from "../models/PostModel.js"
import User from "../models/userModel.js"
import { errorHandler } from "../utils/error.js"


export const createPost = async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403,"Unauthorized"))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace("/[^a-zA-Z0-9-]/",'')
    const newPost = new Post({
        ...req.body,
        slug,
        author:req.user._id
    })
    try {
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
    } catch (error) {
        next(error)
    }
}