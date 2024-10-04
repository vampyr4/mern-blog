import Comment from "../models/commentModel.js"

export const createComment = async(req,res,next)=>{
    try {
        const {content,postId,userId}= req.body
        const newComment = new Comment({
            content,
            postId,
            userId
        })
        await newComment.save()
        res.status(201).json(newComment)
    } catch (error) {
        next(error)
    }
}

export const getCommentsByPostId = async(req,res,next)=>{
    try {
        const comments = await Comment.find({postId:req.params.postId}).sort({createdAt:-1})
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}