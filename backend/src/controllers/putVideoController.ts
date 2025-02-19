import expressAsyncHandler from "express-async-handler";
import { CustomRequest } from "../middleware/authMiddleware";
import { Response } from "express";
import User from "../models/userModel";
import Video from "../models/videoModel";
import { ObjectCannedACL, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

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
//set user info
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  logger: console, // Debugging
});
export const setUserInfo = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { userName, gender, bio, instagram, tiktok, youtube, linkedin } =
      req.body;
    const file = req.file;
    try {
      let picture = undefined;
      if (file) {
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME as string,
          Key: `avatar/${Date.now()}-${file.originalname}`,
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
          picture = s3Response.Location;
        } catch (error) {
          console.error("Error uploading to S3:", error);
          throw new Error("Failed to upload video to S3");
        }
      }

      await User.findByIdAndUpdate(
        req.userId,
        {
          userName,
          picture,
          gender,
          bio,
          instagram,
          tiktok,
          youtube,
          linkedin,
        },
        { new: true, runValidators: true }
      );
      res.status(200).json({ message: "User info saved." });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);
