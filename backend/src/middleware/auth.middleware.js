import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {ENV} from "../lib/env.js";

export const protectRoute = async(req , res , next)=>{
    try{
        const token = req.cookies.jwt
        if(!token) return res.status(401).json({message: "Unauthorized - No token provided"})

        const decoded = jwt.verify(token , ENV.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");
        if(!user) return res.status(401).json({message :"User not found "});

        req.user = user ;
        next();
        
    }catch(error){
        console.log("Error in protectRoute middleware " , error);
        if(error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({message : "Unauthorized", error: error.message});
        }
        res.status(500).json({message : "Internal server error!"});
    }
}
