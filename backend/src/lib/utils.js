import jwt from "jsonwebtoken";
import {ENV} from "./env.js";
export const generateToken = (userId , res)=>{
    if (!ENV.JWT_SECRET || typeof ENV.JWT_SECRET !== "string"){
        throw new Error("Missing JWT_SECRET environment variable");
    }
    // create a token for every user so we can identify the user in future request and response 
    const token = jwt.sign({userId} , ENV.JWT_SECRET , {expiresIn : "7d"});
    res.cookie("jwt", token , {
        maxAge : 7*24*60*60*1000, // 7 days in milliseconds
        httpOnly : true,
        secure : ENV.NODE_ENV !== "development",
        sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
    });
    return token ;
    
}

// https :// localhost -> development 
// https://dsmakmk.com