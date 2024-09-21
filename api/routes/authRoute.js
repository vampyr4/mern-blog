import express from "express"
import { SignUp,SignIn,google,signOut } from "../controllers/authController.js"

const router = express.Router()

router.post('/signup', SignUp )
router.post('/signin', SignIn )
router.post("/signout",signOut)
router.post('/google', google )


export default router