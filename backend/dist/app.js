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
const dataRoute_1 = __importDefault(require("./routes/dataRoute"));
// import authMiddleware from "./middleware/authMiddleware";
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
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
}));
// Middleware to handle large JSON and form data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
// Database connection
(0, db_1.default)();
// Routes
app.use("/express/customauth", authRoute_1.default);
app.use("/express/video", videoRoute_1.default);
app.use("/express/data", dataRoute_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
