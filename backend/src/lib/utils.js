import jwt from "jsonwebtoken";
export const generateToken = (userId , res)=>{
    // crate a token for every user so we can identify the user in futue=re request and response 
    const token = jwt.sign({userId} ,process.env.JWT_SECRET , {expiresIn : "7d"});
    res.cookie("jwt", token , {
        maxAge : 7*24*60*60*1000, // 7 days in milliseconds
        httpOnly : true, // this cookie can only be accessed by the server and not by the client    
        sameSite : "strict", // this cookie will only be sent in requests originating from the same site   
        secure : process.env.NODE_ENV ==="development" ? false :true ,
    })
    return token ;
}

// https :// localhost -> development 
// https://dsmakmk.com