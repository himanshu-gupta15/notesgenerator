import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        await mongoose.connect (process.env.MONGO_URI)
        console.log("DB Connected");
    }catch(error){
        console.log("DB Connection Failed",error);
    }
}

export default connectDb;