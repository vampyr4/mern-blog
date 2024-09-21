import express from "express"
import { createPost } from "../controllers/postController.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

router.post('/create',verifyToken,createPost)

export default router