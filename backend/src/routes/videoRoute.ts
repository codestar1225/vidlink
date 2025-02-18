import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { checkUserName, publishVideo } from "../controllers/postVideoController";
import multer from "multer";
import {
  getMyVideos,
  getUserInfo,
  getUserName,
  getUserVideos,
  getVideo,
  getVideos,
} from "../controllers/getVideoController";
import { addLike, followUser, setUserInfo } from "../controllers/putVideoController";
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
videoRoutes.route("/getuservideos").get(authMiddleware, getUserVideos);
videoRoutes.route("/followuser").put(authMiddleware, followUser);
videoRoutes.route("/getuserinfo").get(authMiddleware, getUserInfo);
videoRoutes.route("/setuserinfo").put(authMiddleware, setUserInfo);
videoRoutes.route("/checkusername").post(authMiddleware, checkUserName);
videoRoutes.route("/getusername").get(authMiddleware, getUserName);

export default videoRoutes;
