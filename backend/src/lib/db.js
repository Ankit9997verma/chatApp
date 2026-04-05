import mongoose from "mongoose"

export const connectDB = async()=>{
    try{
        const uri = process.env.MONGO_URI || process.env.MONGO_URL;
        const conn = await mongoose.connect(uri)
        console.log("Mongo db connected successfully !" , conn.connection.host);

    }catch(error){
        console.log("error to connect with mongo db" , error)
        process.exit(1);
    }
}