import express from "express"
import { createPost,getPosts,deletePosts } from "../controllers/postController.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

router.post('/create',verifyToken,createPost)
router.get('/getposts',getPosts)
router.get('/delete/:id/:userId',verifyToken,deletePosts)

export default router