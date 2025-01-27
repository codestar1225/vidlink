import express from 'express';
import videoController from '../controllers/videoController';

const videoRoutes = express.Router();

videoRoutes.get('/getAllVideos', videoController.getAllVideo);

export default videoRoutes;