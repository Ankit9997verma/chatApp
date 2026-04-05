import express from "express";
import {signup} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login" , (req , res)=>{
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
    res.send("login endpoint");
})
router.post("/logout" , (req , res)=>{
    res.send("logout endpoint");
})
export default router;

