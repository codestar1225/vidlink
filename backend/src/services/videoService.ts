import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import Video from '../models/videoModel';

const getAllVideo = async () => {
  try {
    const allVideos = await Video.find({});
    console.log('Operation succeeded:', allVideos);
    return { allVideos };
  } catch (error: any) {
    console.error('An error occurred:', error.message);
  }
};

export default { getAllVideo };