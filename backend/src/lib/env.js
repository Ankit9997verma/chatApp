// set up environment variables from .env file

import "dotenv/config";

const requiredKeys = [
  "MONGO_URI",
  "JWT_SECRET",
];

const missingKeys = requiredKeys.filter((key) => !process.env[key]);
if (missingKeys.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingKeys.join(", ")}`
  );
}

if (Boolean(process.env.RESEND_API_KEY) !== Boolean(process.env.EMAIL_FROM)) {
  throw new Error(
    "RESEND_API_KEY and EMAIL_FROM must both be set to enable welcome emails."
  );
}

const port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port <= 0 || port > 65535) {
  throw new Error("Invalid PORT environment variable; it must be an integer from 1 to 65535.");
}

export const ENV = {
  PORT: port,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL:
    process.env.CLIENT_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    "http://localhost:5173",
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || "Chatify",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  ARCJET_KEY: process.env.ARCJET_KEY,
  ARCJET_ENV:process.env.ARCJET_ENV,

};