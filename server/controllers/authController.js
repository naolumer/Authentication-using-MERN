import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";


export const register = async(req,res)=>{
    const {name,email,password} = req.body;

    if (!name || !email || !password) {
        return res.json({success:false, message:"Missing Details"})
    }

    try {
        const existingUser = await userModel.findOne({email})
        if (existingUser) {
            return res.status(400).json({success:false, message:"User already Exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const user  = new userModel ({
            name,
            email,
            password:hashedPassword
        })

        await user.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.cookie("token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV ==="production"?
            "none":"strict",
            maxAge: 7*24*60*60*1000
        })

        // Sending welcome email

        const mailOptions = {
            from : process.env.EMAIL_SENDER,
            to : email,
            subject: "Welcome to NaolDEV",
            text: "welcome to our company. you have signed up successfully, thanks for choosing us"
        }
        
        await transporter.sendMail(mailOptions)

        return res.status(200).json({
            success:true,
            message: "User registered Successfully!"
        })

    } catch(error){
        res.json({success:false, message:error.message})
    }
}

export const login = async (req,res)=> {

    const {email,password} = req.body

    if (!email || !password){
        return res.json({
            success:false,
            message:"Email and password required"
        })
    }
    try {
        const user = await userModel.findOne({email})

        if (!user){
            return res.json({
                success:false,
                message:"Invalid Email"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch){
            return res.json({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn: "7d"})
        res.cookie("token",token,{
            httpOnly:true,
            secure : process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV ==="production"? "none":"strict",
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({
            success:true,
            message:"Login successful!"
        })

    } catch(error) {
        res.json({success:false, message:error.message})
    }
}

export const logout = async (req,res)=> {

    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure : process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV ==="production"? "none":"strict",
        })

        return res.json({
            success:true,
            message:"Logout was successful"
        })

    } catch(error){
        res.json({success:false, message:error.message})
    }
}

export const sendVerifyOtp = async (req, res)=>{
    
        try {
        
        const {userId} = req.body
        const user = await userModel.findById(userId)

        if (user.isAccountVerified) {
            return res.json({
                success:false,
                message: "Account has already been verified"
            })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        const expiryotp = Date.now() + 24*60*60*1000
        
        user.verifyOtp = otp
        user.verifyOtpExpireAt = expiryotp

        await user.save()

        const mailOptions = {
            from : process.env.EMAIL_SENDER,
            to : user.email,
            subject: "Email Verification",
            text: `Dear user here is your email verification otp : ${otp} , verify your account using this code`
        }

        await transporter.sendMail(mailOptions)

        res.json ({
            success: true,
            message: "Verification otp has been sent successfully!"
        })


    } catch(error){
        res.json({success:false, message: error.message})
    }
}

export const verifyEmail = async (req,res) =>{
    
    const {userId,otp} = req.body

    if (!userId || !otp) {
        return res.json({
            success:false,
            message:"Missing Details"
        })
    }

    try {
        const user = await userModel.findById(userId)

        if (!user) {
            return res.json({
                success:false,
                message:"User doesn't exist"
            })
        }

        if (user.verifyOtp==="" || user.verifyOtp!==otp) {
            return res.json({
                success:false,
                message:"Invalid otp"
            })
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({
                success:false,
                message: "verification otp has Expired."
            })
        }

        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;
        user.isAccountVerified = true

        await user.save()

        return res.json({
            success:true,
            message: "Email Verified Successfully"
        })

    } catch(error){
        res.json({success:false, message:error.messsage})
    }
}