import jwt from "jsonwebtoken"

const userAuth = async (req, res, next)=>{

    const {token} = req.cookies

    if (!token) {
        return res.json({
            success: false,
            message:"Not Authorized"
        })
    }

    try {

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        
        if (tokenDecode) {
            req.body.userId = tokenDecode.userId
        } else {
            return res.json({
                success:false,
                message: 'Not Authorized, Login Again'
            })
        }
        next()

    } catch(error) {
        res.json({success:false, message:error.message})
    }
}

export default userAuth