import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use (cookieParser())
app.use(cors({credentials:true}))


app.get("/", (req,res)=>{
    return res.send("Server working")
})


app.listen(port, ()=>console.log(`Server running on port:${port}`))