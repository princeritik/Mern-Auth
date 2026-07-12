import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin(origin, callback) {
      // Allows Postman, server-to-server calls and same-origin requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API working fine",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Start a normal server only during local development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });
}

export default app;