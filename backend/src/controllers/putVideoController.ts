import expressAsyncHandler from "express-async-handler";
import { CustomRequest } from "../middleware/authMiddleware";
import { Request, Response } from "express";
import User from "../models/userModel";
import Video from "../models/videoModel";
import Card from "../models/cardModel";

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
      if (req.userId === videoInfo?.userId?.toString()) {
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
        await Video.findByIdAndUpdate(
          videoId,
          { $inc: { likes: -1 } },
          { new: true, runValidators: true }
        );
        await User.findByIdAndUpdate(
          req.userId,
          {
            $pull: { likeVideos: videoId }, // Use $pull to remove an element from an array
          },
          { new: true, runValidators: true }
        );
        res.status(200).json({ message: "Like removed.", like: false });
      } else {
        await Video.findByIdAndUpdate(
          videoId,
          { $inc: { likes: 1 } },
          { new: true, runValidators: true }
        );
        await User.findByIdAndUpdate(
          req.userId,
          {
            $addToSet: { likeVideos: videoId },
          },
          { new: true, runValidators: true }
        );
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
      await User.findByIdAndUpdate(
        targetUserId,
        {
          $addToSet: { followers: req.userId },
        },
        { new: true, runValidators: true }
      );
      res
        .status(200)
        .json({ message: "followed the user.", followStatus: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

//save card
export const saveCard = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { cardId } = req.body;
    if (!cardId) {
      res.status(400).json({ message: "No provided card Id." });
      return;
    }
    if (!req.userId) {
      res.status(400).json({ message: "No provided user Id." });
      return;
    }
    try {
      const card = await Card.findById(cardId).select("savers userId").lean();
      if (!card) {
        res.status(404).json({ message: "Card not found." });
        return;
      }
      //increasing the clicks of card in terms of not user.
      if (req.userId !== card?.userId?.toString()) {
        await Card.findByIdAndUpdate(cardId, { $inc: { clicks: 1 } });
      }
      if (card.savers.includes(req.userId)) {
        await Card.findByIdAndUpdate(cardId, {
          $pull: { savers: req.userId },
        });
        if (req.userId === card?.userId?.toString()) {
          await User.findByIdAndUpdate(req.userId, {
            $inc: { totalSavedCards: -1 },
          });
        }
        res.status(200).json({
          message: "Unsaved card.",
          saved: false,
        });
      } else {
        await Card.findByIdAndUpdate(cardId, {
          $addToSet: { savers: req.userId },
        });
        if (req.userId === card?.userId?.toString()) {
          await User.findByIdAndUpdate(req.userId, {
            $inc: { totalSavedCards: 1 },
          });
        }
        res.status(200).json({
          message: "Saved card.",
          saved: true,
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

// increase the card clicks.
export const increaseClicks = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { cardId } = req.body;
    if (!cardId) {
      res.status(400).json({ message: "No provided card Id." });
    }
    try {
      const card = await Card.findByIdAndUpdate(
        cardId,
        { $inc: { clicks: 1 } },
        { new: true }
      );
      res.status(200).json({ message: "Clicks increased." });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);
// record the video watch time
export const watchTime = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { watchTime, videoId } = req.body;
    if (!watchTime) {
      res.status(400).json({ message: "No provided watch time." });
    }
    if (!videoId) {
      res.status(400).json({ message: "No provided videoId." });
    }
    try {
      await Video.findByIdAndUpdate(videoId, {
        $inc: { watchTime: watchTime },
      });
      const user = await Video.findById(videoId).select("userId").lean();
      await User.findByIdAndUpdate(user?.userId, {
        $inc: { watchTime: watchTime },
      });
      // console.log("watchtime success", watchTime);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);
