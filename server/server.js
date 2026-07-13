import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked origin: ${origin}`)
      );
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API working fine");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

if (process.env.NODE_ENV !== "production") {
  const startServer = async () => {
    try {
      await connectDB();

      app.listen(port, () => {
        console.log(`Server started on port: ${port}`);
      });
    } catch (error) {
      console.error(
        "Failed to start server:",
        error.message
      );
    }
  };

  startServer();
}

export default app;