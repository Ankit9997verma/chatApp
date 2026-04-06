import express from "express";
import {ENV} from "./lib/env.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import path from "path";
import { connectDB } from "./lib/db.js";





const app = express();
const __dirname = path.resolve();

const PORT=ENV.PORT || 3000;

app.use(express.json());

app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);

// make ready for deployment.
if(ENV.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname , "../frontend/dist")))

    
    app.get("*", (_, res)=>{
        res.sendFile(path.join(__dirname , "../frontend" , "dist" , "index.html"))
    })
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT , ()=>{
            console.log("server is running on Port " + PORT)
        });
    } catch (error) {
        console.error("Failed to start server", error);
        process.exit(1);
    }
};

startServer(); 
