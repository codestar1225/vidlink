import { Response } from "express";
import Video from "../../models/videoModel";
import expressAsyncHandler from "express-async-handler";
import { CustomRequest } from "../../middleware/authMiddleware";
import User from "../../models/userModel";
import { S3Client, ObjectCannedACL } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import Card from "../../models/cardModel";

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
    if (!req.userId) {
      res.status(400).json({ message: "No provided user Id." });
      return;
    }
    const { videoLink, duration, title, cards } = req.body;
    const file = req.file;
    let parsedCards: CardType[];
    try {
      parsedCards = typeof cards === "string" ? JSON.parse(cards) : cards;
    } catch (error) {
      res.status(400).json({ message: "Invalid cards data" });
      return;
    }
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
        card: parsedCards.length,
      });
      await video.save();
      await Promise.all(
        parsedCards.map((card: any) =>
          Card.create({
            ...card,
            videoId: video._id,
            userId: req.userId,
            title: video.title,
            savers: card.isSaved
              ? [{ time: new Date(), userId: req.userId }]
              : [],
            isSaved: false,
          })
        )
      );
      await User.updateOne(
        { _id: req.userId },
        {
          $inc: {
            totalVideos: 1,
            totalCards: parsedCards.length,
          },
        }
      );
      console.log(finalVideoLink,'finalvideo link')
      res
        .status(201)
        .json({ message: "Video created", videoLink: finalVideoLink });
    } catch (error: any) {
      console.error("Error in publishVideo:", error);
      res.status(500).json({
        message:
          error.message || "An error occurred while publishing the video",
      });
    }
  }
);

//check the user name
export const checkUserName = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { userName } = req.body;
    if (!userName) {
      res.status(400).json({ message: "No user name provided." });
      return;
    }
    try {
      const isAlreadyName = await User.findOne({ userName: userName })
        .select("_id")
        .lean();
      if (isAlreadyName && isAlreadyName._id != req.userId) {
        res
          .status(200)
          .json({ message: "Username is already taken.", isAlreadyOne: true });
        return;
      }
      res
        .status(200)
        .json({ message: "Username is available.", isAlreadyOne: false });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

//set user info
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
      const isAlreadyName = await User.findOne({ userName: userName })
        .select("userName")
        .lean();
      if (isAlreadyName && isAlreadyName._id != req.userId) {
        res.status(400).json({ message: "Already exist user name." });
        return;
      }
      const userInfo = await User.findByIdAndUpdate(
        { _id: req.userId },
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
        { runValidators: true, new: true }
      );
      res.status(200).json({
        message: "User info saved.",
        user: { userName, picture: userInfo?.picture },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);
