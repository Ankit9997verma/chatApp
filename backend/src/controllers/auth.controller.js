import {generateToken} from "../lib/utils.js"

import User from "../models/User.js"
import bcrypt from "bcryptjs";
export const signup = async (req , res) =>{
    try{
        const {fullName , email , password} = req.body || {};
        if(!fullName || !email || !password){
            return res.status(400).json({message : "All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message: "password should be at least 6 characters"});
        }
        // check if email is regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({message:"Invalid email format"});
        }
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: "Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt); 

        const newUser = new User({
            fullName , 
            email , 
            password : hashedPassword
        })
        const savedUser = await newUser.save();
        generateToken(savedUser._id , res);
        // 201 means something created successfully 
        res.status(201).json({
            _id: savedUser._id,
            fullName: savedUser.fullName,
            email: savedUser.email,
            profilePic: savedUser.profilePic,
        });
    }catch(error){
        console.log("error in signup controller" , error)
        res.status(500).json({message : "Internal server error !"})
    }
}
