import express from "express"
import { createComment,getCommentsByPostId,getComments,deleteComment,likeComment,editComment } from "../controllers/commentController.js"
import {verifyToken} from "../utils/verifyUser.js"
const router = express.Router()

router.post('/create',verifyToken,createComment)
router.get('/getPostComments/:postId',getCommentsByPostId)
router.get('/getcomments',getComments)

router.put('/like/:commentId',verifyToken,likeComment)
router.put('/edit/:commentId',verifyToken,editComment)
router.delete('/delete/:commentId',verifyToken,deleteComment)


export default router