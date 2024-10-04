import express from "express"
import { createComment,getCommentsByPostId } from "../controllers/commentController.js"
import {verifyToken} from "../utils/verifyUser.js"
const router = express.Router()

router.post('/create',verifyToken,createComment)
router.get('/getPostComments/:postId',getCommentsByPostId)

export default router