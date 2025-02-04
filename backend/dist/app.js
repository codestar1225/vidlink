"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const cors_1 = __importDefault(require("cors"));
const videoRoute_1 = __importDefault(require("./routes/videoRoute"));
// import authMiddleware from "./middleware/authMiddleware";
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "*", // You can specify allowed origins here
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Middleware
app.use(express_1.default.json()); // Parse JSON requests
app.use(express_1.default.urlencoded({ extended: true }));
// Database connection
(0, db_1.default)();
// Routes
app.use("/api/auth", authRoute_1.default);
app.use("/api/video", videoRoute_1.default);
app.get('/about', (req, res) => {
    res.send('about');
});
// Protected Route Example
// app.get("/api/protected", authMiddleware, (req, res) => {
//   res.json({ message: "You are authenticated!" });
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
