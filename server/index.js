import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser'

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import configureApp from './config/index.js';
import { isAuthenticated } from"./middleware/jwt.middleware.js"

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware

dotenv.config();

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173"

const app = express();
// configureApp(app);
app.set('trust proxy', 1)

app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
  })
)
app.use(cookieParser())
app.use(express.json({ extended: false, limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))

app.use('/auth', authRoutes)

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/ai', aiRoutes)
app.use('/api/v1/users', userRoutes)

app.get("/", async (req, res) => {
  res.send("Hello from Dream ai");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server has started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
