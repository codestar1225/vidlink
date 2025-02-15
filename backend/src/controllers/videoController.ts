import { Response } from "express";
import Video from "../models/videoModel";
import expressAsyncHandler from "express-async-handler";
import { CustomRequest } from "../middleware/authMiddleware";
import User from "../models/userModel";
import { S3Client, ObjectCannedACL } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  logger: console, // Debugging
});

export interface CardType {
  isSaved: boolean;
}

// publish video and card
export const publishVideo = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { videoLink, duration, title, cards } = req.body;
    const file = req.file;
    let parsedCards: CardType[];
    try {
      parsedCards = typeof cards === "string" ? JSON.parse(cards) : cards;
    } catch (error) {
      res.status(400).json({ message: "Invalid cards data" });
      return;
    }
    const savedCards = parsedCards.filter(
      (card: CardType) => card.isSaved === true
    );

    try {
      let finalVideoLink = videoLink;
      if (file) {
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME as string,
          Key: `videos/${Date.now()}-${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: ObjectCannedACL.public_read,
        };
        console.log("Starting S3 upload...");
        const upload = new Upload({
          client: s3Client,
          params: params,
        });
        try {
          const s3Response = await upload.done();
          console.log("S3 upload successful");
          finalVideoLink = s3Response.Location;
        } catch (error) {
          console.error("Error uploading to S3:", error);
          throw new Error("Failed to upload video to S3");
        }
      }
      if (!finalVideoLink) {
        res.status(400).json({ message: "Video link is required" });
        return;
      }
      const video = new Video({
        userId: req.userId,
        videoLink: finalVideoLink,
        duration: Number(duration),
        title,
        cards: parsedCards,
      });
      await video.save();

      await User.findByIdAndUpdate(req.userId, {
        $inc: {
          videos: 1,
          cards: parsedCards.length,
          savedCards: savedCards.length,
        },
      });
      res.status(201).json({ message: "Video created", video });
    } catch (error: any) {
      console.error("Error in publishVideo:", error);
      res.status(500).json({
        message:
          error.message || "An error occurred while publishing the video",
      });
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
        res.status(200).json({ message: "All videos found.", allVideos });
        return;
      } else {
        const followingVideos = await Video.find({ followers: req.userId })
          .select("videoLink totalView userId _id")
          .populate("user")
          .lean();
        res.status(200).json({
          message: "All and following videos found.",
          allVideos,
          followingVideos,
        });
      }
    } catch (error: any) {
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
      const videoInfo = await Video.findOne({ _id: videoId })
        .select("userId title videoLink duration cards")
        .lean();
      if (!videoInfo) {
        res.status(404).json({ message: "Video not found." });
        return;
      }
      const userInfo = await User.findOne({ _id: videoInfo.userId })
        .select("totalVideos userName likeVideos")
        .lean();
      const userVideos = await Video.find({ userId: videoInfo.userId })
        .select("videoLink _id")
        .lean();
      const relatedVideos = await Video.find({}).select("videoLink _id").lean();
      let like = false;
      if (userInfo?.likeVideos) {
        like = userInfo.likeVideos
          .map((id: any) => id.toString())
          .includes(videoId.toString());
      }
      let owner = false;
      if (videoInfo.userId.toString() === req.userId) {
        owner = true;
      }
      res.status(200).json({
        message: "Video found",
        videoInfo,
        userInfo: { ...userInfo, like, likeVideos: [], owner: true },
        userVideos,
        relatedVideos,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

//add like
export const addLike = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const videoId = req.header("x-video-id");
    if (!videoId) {
      res.status(400).json({ message: "No videoId provided." });
      return;
    }
    try {
      const userData = await User.findByIdAndUpdate(req.userId)
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
        console.log("false");
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
