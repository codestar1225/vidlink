import expressAsyncHandler from "express-async-handler";
import { CustomRequest } from "../middleware/authMiddleware";
import { Response } from "express";
import User from "../models/userModel";
import Video from "../models/videoModel";

//add like
export const addLike = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const videoId = req.header("x-video-id");
    if (!videoId) {
      res.status(400).json({ message: "No videoId provided." });
      return;
    }
    try {
      const videoInfo = await Video.findById(videoId).select("userId").lean();
      if (req.userId === videoInfo?.userId) {
        res.status(400).json({ message: "you can't add yourself." });
        return;
      }
      const userData = await User.findById(req.userId)
        .select("likeVideos")
        .lean();
      if (
        userData &&
        userData.likeVideos &&
        userData.likeVideos.includes(videoId)
      ) {
        await Video.findByIdAndUpdate(videoId, { $inc: { likes: -1 } });
        await User.findByIdAndUpdate(req.userId, {
          $pull: { likeVideos: videoId }, // Use $pull to remove an element from an array
        });
        res.status(200).json({ message: "Like removed.", like: false });
      } else {
        await Video.findByIdAndUpdate(videoId, { $inc: { likes: 1 } });
        await User.findByIdAndUpdate(req.userId, {
          $push: { likeVideos: videoId },
        });
        console.log("true");
        res.status(200).json({ message: "Like added.", like: true });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

//follow the user
export const followUser = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const targetUserId = req.header("x-user-id");
    const currentUserId = req.userId;

    console.log(targetUserId, currentUserId);
    if (!targetUserId) {
      res.status(400).json({ message: "No userId provided." });
      return;
    }
    if (!req.userId) {
      res.status(400).json({ message: "Not found current user id" });
      return;
    }
    if (targetUserId === currentUserId) {
      res.status(400).json({ message: "you can't follow yourself." });
      return;
    }
    try {
      const userData = await User.findById(targetUserId).select("followers");
      if (
        userData &&
        userData.followers &&
        userData.followers.includes(req.userId)
      ) {
        res.status(400).json({ message: "you already followed." });
        return;
      }
      await User.findByIdAndUpdate(targetUserId, {
        $push: { followers: req.userId },
      });
      res
        .status(200)
        .json({ message: "followed the user.", followStatus: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);
