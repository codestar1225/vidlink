import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getVideos, publishVideo } from "../controllers/videoController";

const videoRoutes = express.Router();

videoRoutes.route("/publish").post( authMiddleware,publishVideo);
videoRoutes.route("/getvideos").get(authMiddleware, getVideos);

export default videoRoutes;
