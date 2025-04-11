"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const postVideoController_1 = require("../controllers/videoControllers/postVideoController");
const multer_1 = __importDefault(require("multer"));
const getVideoController_1 = require("../controllers/videoControllers/getVideoController");
const putVideoController_1 = require("../controllers/videoControllers/putVideoController");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const videoRoutes = express_1.default.Router();
videoRoutes
    .route("/publish")
    .post(authMiddleware_1.default, upload.single("file"), postVideoController_1.publishVideo);
videoRoutes.route("/getvideos").get(authMiddleware_1.default, getVideoController_1.getVideos);
videoRoutes.route("/getvideo").get(authMiddleware_1.default, getVideoController_1.getVideo);
videoRoutes.route("/addlike").put(authMiddleware_1.default, putVideoController_1.addLike);
videoRoutes.route("/getmyvideos").get(authMiddleware_1.default, getVideoController_1.getMyVideos);
videoRoutes.route("/getcards").get(authMiddleware_1.default, getVideoController_1.getCards);
videoRoutes.route("/getuservideos").get(authMiddleware_1.default, getVideoController_1.getUserVideos);
videoRoutes.route("/followuser").put(authMiddleware_1.default, putVideoController_1.followUser);
videoRoutes.route("/getuserinfo").get(authMiddleware_1.default, getVideoController_1.getUserInfo);
videoRoutes
    .route("/setuserinfo")
    .post(authMiddleware_1.default, upload.single("file"), postVideoController_1.setUserInfo);
videoRoutes.route("/checkusername").post(authMiddleware_1.default, postVideoController_1.checkUserName);
videoRoutes.route("/getusername").get(authMiddleware_1.default, getVideoController_1.getUserName);
videoRoutes.route("/getusername").get(authMiddleware_1.default, getVideoController_1.getUserName);
videoRoutes.route("/savecard").put(authMiddleware_1.default, putVideoController_1.saveCard);
videoRoutes.route("/increaseclicks").put(authMiddleware_1.default, putVideoController_1.increaseClicks);
videoRoutes.route("/watchtime").put(authMiddleware_1.default, putVideoController_1.watchTime);
videoRoutes
    .route("/storevideofile")
    .post(authMiddleware_1.default, upload.single("file"), postVideoController_1.storeVideoFile);
exports.default = videoRoutes;
