import express from "express"
import {updateUser,deleteUser,getUser,getUsers} from "../controllers/userController.js"
import { verifyToken } from "../utils/verifyUser.js"


const router = express.Router()

router.put("/update/:userId",verifyToken,updateUser)
router.delete("/delete/:userId",verifyToken,deleteUser)
router.get("/getusers",verifyToken,getUsers)
router.get("/:userId",getUser)

export default router