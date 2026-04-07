import {generateToken} from "../lib/utils.js"
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import User from "../models/User.js"
import bcrypt from "bcryptjs";
import {ENV} from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js"; 

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
        secure: ENV.NODE_ENV !== "development",
        sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
    });
    res.status(200).json({message :"Logout successfully !"});
};
                  
export const updateProfile = async(req , res)=>{
    try{
        const {profilePic} = req.body ;
        if(!profilePic) return res.status(400).json({message : "Profile picture is required !"})

        // Validate profilePic is a data URI with allowed MIME type
        if(!profilePic.startsWith("data:image/")) {
            return res.status(400).json({message : "Invalid image format. Expected data URI."});
        }

        const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
        const mimeMatch = profilePic.match(/^data:([^;]+);/);
        const mimeType = mimeMatch ? mimeMatch[1] : null;
        
        if(!mimeType || !allowedMimeTypes.includes(mimeType)) {
            return res.status(400).json({message : "Invalid image MIME type. Allowed: PNG, JPEG, GIF."});
        }

        // Validate base64 payload size (max 5MB)
        const base64Length = profilePic.length;
        const maxSize = 5 * 1024 * 1024; // 5MB
        if(base64Length > maxSize) {
            return res.status(400).json({message : "Image file too large. Maximum size is 5MB."});
        }

        const userId = req.user._id; // in  middleware we use it before initializing next 

        const uploadResponse =await cloudinary.uploader.upload(profilePic);

        const updatedUser =await User.findByIdAndUpdate(
            userId, 
            {profilePic : uploadResponse.secure_url}, 
            {new:true}
        );
        
        // Exclude password from response
        const userResponse = updatedUser.toObject();
        delete userResponse.password;
        res.status(200).json(userResponse);
    }catch(error){
        console.log("error in uploading the file ", error);
        res.status(500).json({message :"Internal server error "});
    }
}