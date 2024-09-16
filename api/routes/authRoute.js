import express from "express"
import { SignUp,SignIn,google } from "../controllers/authController.js"

const router = express.Router()

router.post('/signup', SignUp )
router.post('/signin', SignIn )
router.post('/google', google )


export default router