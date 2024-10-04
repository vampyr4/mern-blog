import express from "express"
import { createComment,getCommentsByPostId,likeComment } from "../controllers/commentController.js"
import {verifyToken} from "../utils/verifyUser.js"
const router = express.Router()

router.post('/create',verifyToken,createComment)
router.get('/getPostComments/:postId',getCommentsByPostId)
router.put('/like/:commentId',verifyToken,likeComment)


export default router