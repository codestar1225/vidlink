import expressAsyncHandler from "express-async-handler";
import { CustomRequest } from "../middleware/authMiddleware";
import { Response } from "express";
import Video from "../models/videoModel";
import Card from "../models/cardModel";
import User from "../models/userModel";

export const getData = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    if (!req.userId) {
      res.status(400).json({ message: "No provided userId." });
      return;
    }
    try {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1); // Subtract 1 year
      const videos = await Video.find({
        userId: req.userId,
        createdAt: { $gte: oneYearAgo },
      })
        .select("views likes card")
        .lean();
      const cards = await Card.find({
        userId: req.userId,
        createdAt: { $gte: oneYearAgo },
      })
        .select("clicks saved link")
        .lean();
      const userInfo = await User.findOne({
        _id: req.userId,
        createdAt: { $gte: oneYearAgo },
      })
        .select(
          "totalVideos videoViews followers  totalCards cardsClicksCreator cardsClicksViewer savedCardsViewer savedCardsCreator  likeVideosViewer likeVideosCreator  timestamp"
        )
        .lean();
      res
        .status(200)
        .json({
          message: "Date found.",
          videos,
          cards,
          userInfo: {
            ...userInfo,
            likeVideosViewer: userInfo?.likeVideosViewer.length,
          },
        });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);
