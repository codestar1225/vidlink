import expressAsyncHandler from "express-async-handler";
import { CustomRequest } from "../middleware/authMiddleware";
import Video from "../models/videoModel";
import { Response } from "express";
import User from "../models/userModel";
import { ICard } from "../models/cardModel";

//get videos
export const getVideos = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    try {
      const allVideos = await Video.find({})
        .select("videoLink views title userId _id")
        .populate("user")
        .lean();
      if (!req.userId) {
        res.status(200).json({ message: "All videos found.", allVideos });
        return;
      } else {
        const following = await User.findById(req.userId)
          .select("followers")
          .lean();
        const followingVideos = await Video.find({
          userId: { $in: following?.followers },
        })
          .select("videoLink views title userId _id")
          .populate("user")
          .lean();
        res.status(200).json({
          message: "All and following videos found.",
          allVideos,
          followingVideos,
        });
      }
    } catch (error: any) {
      console.log("fllowing videos", error);
      res.status(500).json({ message: error.message });
    }
  }
);
//get video detail
export const getVideo = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const videoId = req.header("x-video-id");
    if (!videoId) {
      res.status(400).json({ message: "No videoId provided." });
      return;
    }
    try {
      const videoInfo = await Video.findById(videoId)
        .select("userId title videoLink duration")
        .populate<{ cards: ICard[] }>("cards")
        .lean();
      if (!videoInfo) {
        res.status(404).json({ message: "Video not found." });
        return;
      }
      const userInfo = await User.findById(videoInfo.userId)
        .select("totalVideos userName likeVideos followers")
        .lean();
      const userVideos = await Video.find({ userId: videoInfo.userId })
        .select("videoLink _id")
        .lean();
      const relatedVideos = await Video.find({}).select("videoLink _id").lean();
      let like = false;
      let owner = false;
      let followStatus = false;
      if (req.userId) {
        const user = await User.findById(req.userId)
          .select("likeVideos")
          .lean();
        if (user && user.likeVideos) {
          like = user.likeVideos.includes(videoId);
        }
        if (videoInfo.userId.toString() === req.userId) {
          owner = true;
        }
        if (userInfo?.followers) {
          followStatus = userInfo?.followers.includes(req.userId);
        }
        if (videoInfo?.cards) {
          videoInfo.cards.forEach((card: ICard) => {
            card.isSaved = card.savers.includes(req.userId || "");
            card.savers = [];
          });
        }
      }
      videoInfo.cards.forEach((card: ICard, index) => {
        card.no = index + 1;
      });
      await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } });
      await User.findByIdAndUpdate(userInfo?._id, { $inc: { videoViews: 1 } });
      res.status(200).json({
        message: "Video found",
        videoInfo,
        userInfo: { ...userInfo, like, likeVideos: [], owner, followers: [] },
        userVideos,
        relatedVideos,
        followStatus,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);
//get my videos
export const getMyVideos = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    try {
      const myVideos = await Video.find({ userId: req.userId })
        .select("videoLink title")
        .populate<{ cards: ICard[] }>("cards")
        .lean();

      // myVideos.forEach((video) => {
      //   if (video.cards) {
      //     video.cards.forEach((card: ICard) => {
      //       card.isSaved = card.savers.includes(req.userId || "");
      //       card.savers = [];
      //     });
      //   }
      // });
      // const cardsArray = myVideos.map((video) => ({
      //   cards: video.cards || [], // Ensure it always has an array
      // }));

      // const cards = await Card.find({ userId: req.userId });
      // console.log(JSON.stringify(cards, null, 2));
      // cards.forEach((card: ICard) => {
      //   card.isSaved = card.savers.includes(req.userId || "");
      //   card.savers = [];
      // });
      const likes = await User.findById(req.userId).select("likeVideos").lean();
      const myLikesVideos = await Video.find({
        _id: { $in: likes?.likeVideos },
      })
        .select("videoLink cards title")
        .lean();
      const userInfo = await User.findById(req.userId)
        .select(
          "totalVideos totalCards followers tiktok youtube linkedin instagram userName picture"
        )
        .lean();
      res.status(200).json({
        message: "my videos found",
        myVideos,
        myLikesVideos,
        userInfo: { ...userInfo, followers: userInfo?.followers.length },
      });
    } catch (error: any) {
      console.log("fllowing videos", error);
      res.status(500).json({ message: error.message });
    }
  }
);

// get the user videos
export const getUserVideos = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.header("x-user-id");
    if (!userId) {
      res.status(400).json({ message: "No userId provided." });
      return;
    }
    try {
      const userVideos = await Video.find({ userId: userId })
        .select("videoLink")
        .lean();
      const userInfo = await User.findById(userId)
        .select(
          "totalVideos totalCards followers tiktok youtube linkedin instagram userName picture email"
        )
        .lean();
      await User.findByIdAndUpdate(userId, { $inc: { profileViews: 1 } });
      let followStatus = false;
      if (req.userId && userInfo?.followers) {
        followStatus = userInfo?.followers.includes(req.userId);
      }
      res.status(200).json({
        message: "my videos found",
        userVideos,
        userInfo: { ...userInfo, followers: userInfo?.followers.length },
        followStatus,
      });
    } catch (error: any) {
      console.log("fllowing videos", error);
      res.status(500).json({ message: error.message });
    }
  }
);

//get user info
export const getUserInfo = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    try {
      const userInfo = await User.findById(req.userId)
        .select("userName picture gender bio instagram tiktok youtube linkedin")
        .lean();
      const checkingNames = await User.find({}).select("userName").lean();
      res
        .status(200)
        .json({ message: "user info found.", userInfo, checkingNames });
    } catch (error: any) {
      console.log("fllowing videos", error);
      res.status(500).json({ message: error.message });
    }
  }
);

//get user name
export const getUserName = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    try {
      const userName = await User.findById(req.userId)
        .select("userName")
        .lean();
      res
        .status(200)
        .json({ message: "user info found.", userName: userName?.userName });
    } catch (error: any) {
      console.log("fllowing videos", error);
      res.status(500).json({ message: error.message });
    }
  }
);
