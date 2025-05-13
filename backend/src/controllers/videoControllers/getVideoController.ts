import expressAsyncHandler from "express-async-handler";
import { CustomRequest } from "../../middleware/authMiddleware";
import Video from "../../models/videoModel";
import { Response } from "express";
import User from "../../models/userModel";
import Card, { ICard } from "../../models/cardModel";

//get videos
export const getVideos = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    try {
      const allVideos = await Video.find({})
        .select("videoLink views card title userId _id")
        .populate("user")
        .lean();
      if (!req.userId) {
        res.status(200).json({ message: "All videos found.", allVideos });
        return;
      } else {
        const following = await User.find({
          followers: { $elemMatch: { userId: req.userId, create: true } },
        })
          .select("_id")
          .lean();
        const followingUserIds =
          following?.map((follower) => follower._id) || [];
        const followingVideos = await Video.find({
          userId: { $in: followingUserIds },
        })
          .select("videoLink views card title userId _id")
          .populate("user")
          .lean(); 
        res.status(200).json({
          message: "All and following videos found.",
          allVideos,
          followingVideos,
        });
      }
    } catch (error: any) {
      console.log("getVideos", error);
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
        .select("totalVideos userName followers picture")
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
          .select("likeVideosViewer")
          .lean();
        if (user && user.likeVideosViewer) {
          like = user.likeVideosViewer.some((key) => key.videoId === videoId);
        }
        if (videoInfo.userId.toString() === req.userId) {
          owner = true;
        }
        if (userInfo?.followers) {
          followStatus = userInfo?.followers.some(
            (key) => key.userId === req.userId && key.create
          );
        }
        if (videoInfo?.cards) {
          videoInfo.cards.forEach((card: ICard) => {
            card.isSaved = card.savers.some((key) => key.userId === req.userId);
            card.savers = [];
          });
        }
        if (req.userId !== videoInfo.userId.toString()) {
          await Promise.all([
            User.updateOne(
              { _id: userInfo?._id },
              {
                $addToSet: { videoViews: new Date() },
              }
            ),
            Video.updateOne({ _id: videoId }, { $inc: { views: 1 } }),
          ]);
        }
      } else {
        await Promise.all([
          User.updateOne(
            { _id: userInfo?._id },
            {
              $addToSet: { videoViews: new Date() },
            }
          ),
          Video.updateOne({ _id: videoId }, { $inc: { views: 1 } }),
        ]);
      }
      res.status(200).json({
        message: "Video found",
        videoInfo,
        userInfo: { ...userInfo, like, owner, followers: [] },
        userVideos,
        relatedVideos,
        followStatus,
      });
    } catch (error: any) {
      console.error("getVideo", error);
      res.status(500).json({ message: error.message });
    }
  }
);
//get my videos
export const getMyVideos = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    if (!req.userId) {
      res.status(400).json({ message: "No provided userId." });
      return;
    }
    try {
      const myVideos = await Video.find({ userId: req.userId })
        .select("videoLink title")
        .lean();
      const likes = await User.findById(req.userId)
        .select("likeVideosViewer")
        .lean();
      const likeVideosIds =
        likes?.likeVideosViewer?.map((key) => key.videoId) || [];
      const myLikesVideos = await Video.find({
        _id: { $in: likeVideosIds },
      })
        .select("videoLink title")
        .lean();
      const userInfo = await User.findById(req.userId)
        .select(
          "totalVideos totalCards followers tiktok youtube linkedin instagram userName picture bio"
        )
        .lean();
      const followingNumber = userInfo?.followers.filter(
        (key) => key.create
      ).length;
      res.status(200).json({
        message: "my videos found",
        myVideos,
        myLikesVideos,
        userInfo: { ...userInfo, followers: followingNumber },
      });
    } catch (error: any) {
      console.log("getMyVideos", error);
      res.status(500).json({ message: error.message });
    }
  }
);
//get cards
export const getCards = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    if (!req.userId) {
      res.status(400).json({ message: "No provided userId." });
      return;
    }
    try {
      //Fetch cards (Sorted by videoId & no in MongoDB itself)
      const cards = await Card.find({
        $or: [{ userId: req.userId }, { "savers.userId": req.userId }],
      })
        .sort({ videoId: 1, no: 1 })
        .lean();
      // Extract unique userIds from the cards
      const userIds = [...new Set(cards.map((card) => card.userId))];
      // Fetch all usernames in one query
      const users = await User.find({ _id: { $in: userIds } })
        .select("userName")
        .lean();
      // Create a lookup dictionary { userId: userName }
      const userMap: Record<string, string> = {};
      users.forEach((user) => {
        userMap[user._id.toString()] = user.userName;
      });
      // Process cards & group them
      const groupedCards: {
        title: string;
        userName: string;
        videoId: string;
        cards: ICard[];
      }[] = [];
      for (const card of cards) {
        card.isSaved = card.savers.some((key) => key.userId === req.userId);
        card.savers = []; // Clear savers list for security reasons
        let group = groupedCards.find(
          (g) => g.videoId === String(card.videoId)
        );
        if (!group) {
          group = {
            title: card.title,
            userName: userMap[card.userId.toString()] || "Unknown",
            videoId: String(card.videoId),
            cards: [],
          };
          groupedCards.push(group);
        }
        group.cards.push(card);
      }
      res.status(200).json({ message: "Cards found.", cards: groupedCards });
    } catch (error: any) {
      console.log("getCards", error);
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
        followStatus = userInfo?.followers.some(
          (key) => key.userId === req.userId
        );
      }
      const followingNumber = userInfo?.followers.filter(
        (key) => key.create
      ).length;
      res.status(200).json({
        message: "my videos found",
        userVideos,
        userInfo: { ...userInfo, followers: followingNumber },
        followStatus,
      });
    } catch (error: any) {
      console.log("getUserVideos", error);
      res.status(500).json({ message: error.message });
    }
  }
);

//get user info
export const getUserInfo = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    if (!req.userId) {
      res.status(400).json({ message: "No userId provided." });
      return;
    }
    try {
      const userInfo = await User.findById(req.userId)
        .select("userName picture gender bio instagram tiktok youtube linkedin")
        .lean();
      const checkingNames = await User.find({}).select("userName").lean();
      res
        .status(200)
        .json({ message: "user info found.", userInfo, checkingNames });
    } catch (error: any) {
      console.log("getUserInfo", error);
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
      console.log("getUserName", error);
      res.status(500).json({ message: error.message });
    }
  }
);
