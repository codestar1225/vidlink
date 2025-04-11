"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const dataController_1 = require("../controllers/dataController");
const dataRoutes = express_1.default.Router();
dataRoutes.route("/getdatacreator").get(authMiddleware_1.default, dataController_1.getDataCreator);
dataRoutes.route("/getdataviewer").get(authMiddleware_1.default, dataController_1.getDataViewer);
exports.default = dataRoutes;
