import express from 'express'
import { login, logout, register, verifyEmail, sendVerifyOtp,isAuthenticated, 
        sendResetOtp, resetPassword} from '../controllers/authController.js'
import userAuth from '../middlewares/userAuth.js'


const authRouter = express.Router()


authRouter.post("/register",register)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.post("/send-verifyotp",userAuth, sendVerifyOtp)
authRouter.post("/verify-email-otp", userAuth, verifyEmail)
authRouter.get("/is-auth",userAuth,isAuthenticated)
authRouter.post("/send-resetotp",sendResetOtp)
authRouter.post("/reset-password",resetPassword)

export default authRouter