import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoute";
import cors from "cors";
import videoRoutes from "./routes/videoRoute";
import dataRoutes from "./routes/dataRoute";
// import authMiddleware from "./middleware/authMiddleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // You can specify allowed origins here
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-video-id",
      "x-user-id",
      "x-duration",
    ],
    credentials: true,
  })
);

// Middleware to handle large JSON and form data
app.use(express.json());
app.use(express.urlencoded());

// Database connection
connectDB();

// Routes
app.use("/express/customauth", authRoutes);
app.use("/express/video", videoRoutes);
app.use("/express/data", dataRoutes);

// Protected Route Example
// app.get("/api/protected", authMiddleware, (req, res) => {
//   res.json({ message: "You are authenticated!" });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
