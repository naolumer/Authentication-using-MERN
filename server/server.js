import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js"
import authRouter from "./routes/authRouter.js"


const app = express()
const port = process.env.PORT || 4000
connectDB()

app.use(express.json())
app.use (cookieParser())
app.use(cors({credentials:true}))


app.get("/", (req,res)=> {
   return res.send("server working")
})
app.use("/api/user",authRouter)


app.listen(port, ()=>console.log(`Server running on port:${port}`))