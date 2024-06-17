import {Router} from "express"
import { registerUser, login,Adminlogin } from "../controllers/authController"

const authRouter=Router()
authRouter.post("/register",registerUser)
authRouter.post("/login",login)
authRouter.post("/AdminLogin",Adminlogin)

export default authRouter