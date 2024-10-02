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

export const getPosts = async(req,res,next)=>{
    try {
        const startIndex = parseInt(req.query.startIndex) || 0 ;
        const limit = parseInt(req.query.limit) || 9 ;
        const sortDirection = req.query.order === 'desc' ? -1 : 1
        const posts = await Post.find({
            ...(req.query.author && {author: req.query.author}),
            ...(req.query.category && {category: req.query.category}),
            ...(req.query.slug && {slug: req.query.slug}),
            ...(req.query.postId && {_id: req.query.postId}),
            ...(req.query.searchTerm && {
                $or:[
                    {title:{$regex: req.query.searchTerm, $options:'i'}},
                    {content:{$regex: req.query.searchTerm, $options:'i'}}   
                ],
            }),
    }).sort({upadtedAt:sortDirection}).skip(startIndex).limit(limit);
        const totalPosts = await Post.countDocuments()
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )
        const totalPostsThisMonth = await Post.countDocuments({createdAt: {$gte: oneMonthAgo}})
        res.status(200).json({posts, totalPosts, totalPostsThisMonth})

    } catch (error) {
        next(error)
    }
}

export const deletePosts = async(req,res,next)=>{
    if(!req.user.isAdmin && req.user.is !== req.params.user){
        return next(new errorHandler(401,"Unauthorized!"))
    }
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({success:true, message:"Post deleted successfully!"})
    } catch (error) {
        next(error)
    }
}

export const getSinglePost = async(req, res,next) =>{
    try {
        const {id} = req.params
        // console.log(id);
        
        const post = await Post.findOne({_id:id})
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}

export const updatePost = async(req,res)=>{
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:{
            title:req.body.title,
            content:req.body.content,
            category:req.body.category,
            image:req.body.image
        }},{new:true})
        res.status(200).json(updatedPost)
    } catch (error) {
        next(error)
    }   
}