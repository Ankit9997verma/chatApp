import mongoose from "mongoose"
import {ENV} from "./env.js"

export const connectDB = async()=>{
    try{
        const uri = ENV.MONGO_URI || ENV.MONGO_URL;
        if(!uri){
            console.error("Error connecting to MongoDB: Missing MONGO_URI or MONGO_URL");
            process.exit(1);
        }
        const conn = await mongoose.connect(uri)
        console.log("MongoDB connected successfully!" , conn.connection.host);

    }catch(error){
        console.error("Error connecting to MongoDB" , error)
        process.exit(1);
    }
}