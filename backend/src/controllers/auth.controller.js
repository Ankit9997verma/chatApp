import {generateToken} from "../lib/utils.js"
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import User from "../models/User.js"
import bcrypt from "bcryptjs";
import {ENV} from "../lib/env.js";

export const signup = async (req , res) =>{
     const {fullName , email , password} = req.body || {};
    try{
       
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
        });

        let savedUser;
        try {
          savedUser = await newUser.save();
        } catch (saveError) {
          console.error("Failed to save user:", saveError);
          return res.status(500).json({ message: "Failed to create user" });
        }

        if (!savedUser) {
          return res.status(500).json({ message: "Failed to create user" });
        }

        generateToken(savedUser._id , res);
        // 201 means something created successfully 
        res.status(201).json({
            _id: savedUser._id,
            fullName: savedUser.fullName,
            email: savedUser.email,
            profilePic: savedUser.profilePic,
        });

        // sending a welcome message to the user using resend.io...
        try {
          await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
        } catch (error) {
          console.error("Failed to send welcome email:", error);
        }


    }catch(error){
        console.log("error in signup controller" , error)
        res.status(500).json({message : "Internal server error !"})
    }
};

export const login = async(req , res)=>{
    const {email , password  } = req.body || {};
    try{
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message:"Invalid credentials!"}) ; 
        // never tell the client , email or password ...
        const isPasswordCorrect = await bcrypt.compare(password , user.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid credentials!"}) ;

        generateToken(user._id , res)

        res.status(200).json({
            _id: user._id , 
            fullName: user.fullName ,
            email: user.email , 
            profilePic: user.profilePic ,
        })

    }catch(error){
        console.log("error in login controller " ,  error );
        res.status(500).json({message : "Internal server error!"})
    }
};

export const logout = async(_, res)=>{
    res.cookie("jwt" , "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
        secure: ENV.NODE_ENV === "development" ? false : true,
    })
    res.status(200).json({message :"Logout successfully !"})
};
