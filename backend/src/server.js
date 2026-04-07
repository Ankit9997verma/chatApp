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

const corsOptions = {
  origin: (origin, callback) => {
    if (ENV.NODE_ENV !== "production") {
      callback(null, true);
      return;
    }
    if (origin === ENV.CLIENT_URL) {
      callback(null, true);
      return;
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(express.json({ limit: "5mb" })); // req.body
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Since frontend is deployed to Vercel separately, we don't serve frontend from here.
// Provide a basic root route for health checks
app.get('/', (req, res) => {
  res.send('Chat App Backend is running successfully!');
});

server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});

