// set up environment variables from .env file

import "dotenv/config";

const requiredKeys = [
  "MONGO_URI",
  "JWT_SECRET",
  "PORT",
  "CLIENT_URL",
  "RESEND_API_KEY",
  "EMAIL_FROM",
];

const missingKeys = requiredKeys.filter((key) => !process.env[key]);
if (missingKeys.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingKeys.join(", ")}`
  );
}

const port = Number(process.env.PORT);
if (Number.isNaN(port) || port <= 0) {
  throw new Error("Invalid PORT environment variable; it must be a positive number.");
}

export const ENV = {
  PORT: port,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  ARCJET_KEY: process.env.ARCJET_KEY,
  ARCJET_ENV:process.env.ARCJET_ENV,

};