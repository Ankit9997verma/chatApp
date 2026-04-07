import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

// Clean up the client URL just in case there are trailing slashes or spaces in the env variable
const allowedOrigin = ENV.CLIENT_URL ? ENV.CLIENT_URL.trim().replace(/\/$/, "") : "";

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    if (ENV.NODE_ENV !== "production") {
      return callback(null, true);
    }

    // Clean up the incoming origin just in case
    const incomingOrigin = origin.trim().replace(/\/$/, "");

    // Check if the origin matches the cleaned CLIENT_URL
    if (incomingOrigin === allowedOrigin) {
      return callback(null, true);
    }

    // Fallback: if it's struggling due to weird text formatting in Railway environment variables, 
    // we can temporarily allow it to pass if it includes the railway.app domain.
    if (incomingOrigin.includes("railway.app")) {
      return callback(null, true);
    }
    
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(express.json({ limit: "5mb" })); // req.body
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Catch all handler: send back React's index.html file for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});

