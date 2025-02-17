import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { publishVideo } from "../controllers/postVideoController";
import multer from "multer";
import {
  getMyVideos,
  getUserVideos,
  getVideo,
  getVideos,
} from "../controllers/getVideoController";
import { addLike, followUser } from "../controllers/putVideoController";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const videoRoutes = express.Router();

videoRoutes
  .route("/publish")
  .post(authMiddleware, upload.single("file"), publishVideo);
videoRoutes.route("/getvideos").get(authMiddleware, getVideos);
videoRoutes.route("/getvideo").get(authMiddleware, getVideo);
videoRoutes.route("/addlike").put(authMiddleware, addLike);
videoRoutes.route("/getmyvideos").get(authMiddleware, getMyVideos);
videoRoutes.route("/getuservideos").get(authMiddleware,getUserVideos);
videoRoutes.route('/followuser').put(authMiddleware,followUser)

export default videoRoutes;
