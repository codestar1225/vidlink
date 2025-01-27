import { Request, Response } from 'express';
import authService from '../services/authService';
import videoService from '../services/videoService';

const getAllVideo = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const allVideos = await videoService.getAllVideo();
    res.status(201).json({ message: 'User created', data: allVideos });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default { getAllVideo };