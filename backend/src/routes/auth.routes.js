import express from "express";
import {signup, login , logout , updateProfile} from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();


router.use(arcjetProtection);

router.post("/signup", signup);
router.post("/login" , login);
router.post("/logout" , logout);

router.put("/update-profile" ,protectRoute ,  updateProfile);

router.get("/check" , protectRoute , (req , res) => {
    const userResponse = {
        _id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        profilePic: req.user.profilePic
    };
    res.status(200).json(userResponse);
});


export default router;



