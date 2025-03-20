import mongoose from "mongoose";

const URL = process.env.MONGODB_URI

const connectDB = async ()=>{
    mongoose.connection.on("connected",()=>console.log("DB connected"))
    await mongoose.connect(`${URL}/mern-auth`)
}

export default connectDB