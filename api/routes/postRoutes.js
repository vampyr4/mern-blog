import express from "express"
import { createPost,getPosts,deletePosts, getSinglePost,updatePost } from "../controllers/postController.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

router.post('/create',verifyToken,createPost)
router.get('/getposts',getPosts)
router.get('/getsinglepost/:id',getSinglePost)
router.get('/delete/:id/:userId',verifyToken,deletePosts)
router.put('/update/:id/:userId',verifyToken,updatePost)

export default router