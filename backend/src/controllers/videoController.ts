import { Request, Response } from "express";
import Video from "../models/videoModel";
import expressAsyncHandler from "express-async-handler";
import { CustomRequest } from "../middleware/authMiddleware";

export const publishVideo = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { videoLink, duration, title, cards, isSaved } = req.body;
    let parsedCards = cards;
    if (typeof cards === "string") {
      parsedCards = JSON.parse(cards);
    }
    try {
      const video = new Video({
        userId: req.userId,
        videoLink,
        duration: Number(duration),
        title,
        cards: parsedCards,
        isSaved,
      });
      await video.save();
      res.status(201).json({ message: "Video created", video });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

//get videos
export const getVideos = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    try {
      const allVideos = await Video.find({})
      .populate("user")
      .select("videoLink totalView userId _id")
      .lean();
      if (!req.userId) {
        res.status(201).json({ message: "All videos found", allVideos });
        return;
      } else {
        const followingVideos = await Video.find({ followers: req.userId })
        .select("videoLink totalView userId _id")
        .populate("user")
        .lean();
        res
          .status(201)
          .json({ message: "All videos found", allVideos, followingVideos });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);
