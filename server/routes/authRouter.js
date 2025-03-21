import express from 'express'
import { login, logout, register, verifyEmail, sendVerifyOtp,isAuthenticated} from '../controllers/authController.js'
import userAuth from '../middlewares/userAuth.js'


const authRouter = express.Router()


authRouter.post("/register",register)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.post("/send-verifyotp",userAuth, sendVerifyOtp)
authRouter.post("/verify-email-otp", userAuth, verifyEmail)
authRouter.post("/is-auth",userAuth,isAuthenticated)

export default authRouter