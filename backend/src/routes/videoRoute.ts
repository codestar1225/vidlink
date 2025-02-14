import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  addLike,
  getVideo,
  getVideos,
  publishVideo,
} from "../controllers/videoController";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const videoRoutes = express.Router();

videoRoutes
  .route("/publish")
  .post(authMiddleware, upload.single("file"), publishVideo);
videoRoutes.route("/getvideos").get(authMiddleware, getVideos);
videoRoutes.route("/getvideo").get(authMiddleware, getVideo);
videoRoutes.route("/addlike").put(authMiddleware, addLike);

export default videoRoutes;
