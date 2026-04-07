import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { io, getReceiverSocketId } from "../lib/socket.js";
export const getAllContacts = async (req , res)=>{
    try {
        // yha par humko saree contacts chaiye sirf apne app ko skip kar ke .
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers)
    }catch(error){
        console.log("Error in getAllContacts:" , error);
        res.status(500).json({message :"Server error"})

    }
}

export const getMessagesByUserId = async(req , res)=>{
    try{
        const myId= req.user._id;
        const {id : userToChatId}= req.params
       
        // me and you i send you and me as receiver and vice versa 

        const message = await Message.find({
            $or:[
                {senderId:myId , receiverId: userToChatId},
                {senderId:userToChatId , receiverId: myId}
            ]
        })
        res.status(200).json(message);
    }catch(error){

    }
}

export const  sendMessage = async(req , res)=>{
    try{
        const {text , image}= req.body;
        const {id: receiverId}=req.params;
        const senderId= req.user._id;

         if (!text && !image) {
      return res.status(400).json({ message: "Text or image is required." });
    }
    if (senderId.equals(receiverId)) {
      return res.status(400).json({ message: "Cannot send messages to yourself." });
    }
    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found." });
    }

        let imageUrl ; 
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId , 
            receiverId , 
            text ,
            image:imageUrl,
        })
        await newMessage.save();
        // todo : send message in real time if user is online   ~soket.io     
         const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
        
        res.status(201).json(newMessage);
    }catch(error){
        console.log("error in sendMessage controller:" , error.message);
        res.status(500).json({message : "Server error!"})
    }

}

export const getChatPartners= async(req , res)=>{
    try{
        const loggedInUserId = req.user._id;
        // find all the messages where the logged in user is either sender or reciever 
        const messages = await Message.find({
            $or: [{senderId: loggedInUserId},{receiverId:loggedInUserId}],
        });           
        const chatPartnerIds = [
            ...new Set(
                messages.map(msg => 
                    msg.senderId.toString() === loggedInUserId.toString() 
                    ? msg.receiverId.toString() 
                    : msg.senderId.toString()))];
        const chatPartners = await User.find({_id: {$in: chatPartnerIds}}).select("-password");    
        res.status(200).json(chatPartners);       
    }catch(error){
         console.error("Error in getChatPartners: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

//chatapp-production-6d04.up.railway.app