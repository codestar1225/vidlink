import expressAsyncHandler from "express-async-handler";
import { CustomRequest } from "../middleware/authMiddleware";
import { Response } from "express";
import Video from "../models/videoModel";
import Card from "../models/cardModel";
import User from "../models/userModel";

const getPastDate = (duration: string) => {
  const date = new Date();
  switch (duration) {
    case "year":
      date.setFullYear(date.getFullYear() - 1);
      break;
    case "month":
      date.setMonth(date.getMonth() - 1);
      break;
    case "week":
      date.setDate(date.getDate() - 7);
      break;
  }
  return date;
};

//get data as a creator
export const getDataCreator = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const duration = req.header("x-duration");
    if (!req.userId) {
      res.status(400).json({ message: "No provided userId." });
      return;
    }
    if (!duration) {
      res.status(400).json({ message: "No provided userId." });
      return;
    }
    try {
      let userInfo;
      let videos;
      let cards;
      let gainedFollowers;
      let lostFollowers;
      if (duration === "ever") {
        [videos, cards, userInfo] = await Promise.all([
          Video.find({ userId: req.userId })
            .select("title views likes card watchTime")
            .sort({ views: -1 })
            .lean(),
          Card.find({
            userId: req.userId,
          })
            .select("title name clicks saved link no ")
            .sort({ clicks: -1 })
            .lean(),
          User.findById(req.userId)
            .select("followers savedCardsCreator cardsClicksCreator picture")
            .lean(),
        ]);
        if (userInfo?.followers) {
          gainedFollowers = userInfo?.followers.filter(
            (key) => key.create || 0
          ).length;
          lostFollowers = userInfo?.followers.filter(
            (key) => !key.create || 0
          ).length;
        }
      } else {
        const durationAgo = getPastDate(duration);
        [videos, cards, userInfo] = await Promise.all([
          Video.find({
            userId: req.userId,
            createdAt: { $gte: durationAgo },
          })
            .select("title views likes card watchTime createdAt")
            .sort({ views: -1 })
            .lean(),
          Card.find({
            userId: req.userId,
            createdAt: { $gte: durationAgo },
          })
            .select("title name clicks saved link no createdAt")
            .sort({ clicks: -1 })
            .lean(),
          User.findById(req.userId)
            .select("followers savedCardsCreator cardsClicksCreator picture")
            .lean(),
        ]);
        if (userInfo?.followers) {
          userInfo.followers = userInfo.followers.filter(
            (follower) => follower.time > durationAgo
          );
          gainedFollowers = userInfo?.followers.filter(
            (key) => key.create || 0
          ).length;
          lostFollowers = userInfo?.followers.filter(
            (key) => !key.create || 0
          ).length;
        }
        if (userInfo?.savedCardsCreator) {
          userInfo.savedCardsCreator = userInfo.savedCardsCreator.filter(
            (card) => card.time > durationAgo
          );
        }
        if (userInfo?.cardsClicksCreator) {
          userInfo.cardsClicksCreator = userInfo.cardsClicksCreator.filter(
            (card) => card > durationAgo
          );
        }
      }
      res.status(200).json({
        message: "Data found.",
        videos,
        cards,
        userInfo: {
          ...userInfo,
          gainedFollowers,
          lostFollowers,
          followers: [],
          savedCards: userInfo?.savedCardsCreator?.length || 0,
          cardsClicks: userInfo?.cardsClicksCreator?.length || 0,
        },
      });
    } catch (error: any) {
      console.log("error", error);
      res.status(500).json({ message: error.message });
    }
  }
);

//get data as a viewer
export const getDataViewer = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const duration = req.header("x-duration");
    if (!req.userId) {
      res.status(400).json({ message: "No provided userId." });
      return;
    }
    if (!duration) {
      res.status(400).json({ message: "No provided userId." });
      return;
    }
    try {
      let data;
      if (duration === "ever") {
        data = await User.findById(req.userId)
          .select("likeVideosViewer cardsClicksViewer savedCardsViewer")
          .lean();
      } else {
        const durationAgo = getPastDate(duration);
        data = await User.findById(req.userId)
          .select("likeVideosViewer cardsClicksViewer savedCardsViewer ")
          .lean();
        if (data?.likeVideosViewer) {
          data.likeVideosViewer = data.likeVideosViewer.filter(
            (key) => key.time > durationAgo
          );
        }
        if (data?.cardsClicksViewer) {
          data.cardsClicksViewer = data.cardsClicksViewer.filter(
            (key) => key > durationAgo
          );
        }
        if (data?.savedCardsViewer) {
          data.savedCardsViewer = data.savedCardsViewer.filter(
            (key) => key.time > durationAgo
          );
        }
      }
      res.status(200).json({
        message: "Data found.",
        userInfo: {
          likeVideos: data?.likeVideosViewer?.length || 0,
          cardsClicks: data?.cardsClicksViewer?.length || 0,
          savedCards: data?.savedCardsViewer?.length || 0,
        },
      });
    } catch (error: any) {
      console.log("error", error);
      res.status(500).json({ message: error.message });
    }
  }
);
