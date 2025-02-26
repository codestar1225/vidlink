import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getDataCreator, getDataViewer } from "../controllers/dataController";

const dataRoutes = express.Router();
dataRoutes.route("/getdatacreator").get(authMiddleware, getDataCreator);
dataRoutes.route("/getdataviewer").get(authMiddleware, getDataViewer);
export default dataRoutes;
