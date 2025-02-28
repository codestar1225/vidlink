import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  checkUserName,
  publishVideo,
  setUserInfo,
} from "../controllers/videoControllers/postVideoController";
import multer from "multer";
import {
  getCards,
  getMyVideos,
  getUserInfo,
  getUserName,
  getUserVideos,
  getVideo,
  getVideos,
} from "../controllers/videoControllers/getVideoController";
import {
  addLike,
  followUser,
  increaseClicks,
  saveCard,
  watchTime,
} from "../controllers/videoControllers/putVideoController";
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
videoRoutes.route("/getcards").get(authMiddleware, getCards);
videoRoutes.route("/getuservideos").get(authMiddleware, getUserVideos);
videoRoutes.route("/followuser").put(authMiddleware, followUser);
videoRoutes.route("/getuserinfo").get(authMiddleware, getUserInfo);
videoRoutes
  .route("/setuserinfo")
  .post(authMiddleware, upload.single("file"), setUserInfo);
videoRoutes.route("/checkusername").post(authMiddleware, checkUserName);
videoRoutes.route("/getusername").get(authMiddleware, getUserName);
videoRoutes.route("/getusername").get(authMiddleware, getUserName);
videoRoutes.route("/savecard").put(authMiddleware, saveCard);
videoRoutes.route("/increaseclicks").put(authMiddleware, increaseClicks);
videoRoutes.route("/watchtime").put(authMiddleware, watchTime);

export default videoRoutes;
