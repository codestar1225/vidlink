"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoController_1 = __importDefault(require("../controllers/videoController"));
const videoRoutes = express_1.default.Router();
videoRoutes.get('/getAllVideos', videoController_1.default.getAllVideo);
exports.default = videoRoutes;
