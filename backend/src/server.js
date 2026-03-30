import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

dotenv.config();


const app = express();
const PORT= process.env.PORT || 3000;
app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);
app.listen(PORT , ()=> console.log("server is running on Port ")) ; 
