"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataViewer = exports.getDataCreator = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const videoModel_1 = __importDefault(require("../models/videoModel"));
const cardModel_1 = __importDefault(require("../models/cardModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const getPastDate = (duration) => {
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
exports.getDataCreator = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
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
            [videos, cards, userInfo] = yield Promise.all([
                videoModel_1.default.find({ userId: req.userId })
                    .select("title views likes card watchTime")
                    .sort({ views: -1 })
                    .lean(),
                cardModel_1.default.find({
                    userId: req.userId,
                })
                    .select("title name clicks saved link no ")
                    .sort({ clicks: -1 })
                    .lean(),
                userModel_1.default.findById(req.userId)
                    .select("followers savedCardsCreator cardsClicksCreator picture")
                    .lean(),
            ]);
            if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.followers) {
                gainedFollowers = userInfo === null || userInfo === void 0 ? void 0 : userInfo.followers.filter((key) => key.create || 0).length;
                lostFollowers = userInfo === null || userInfo === void 0 ? void 0 : userInfo.followers.filter((key) => !key.create || 0).length;
            }
        }
        else {
            const durationAgo = getPastDate(duration);
            [videos, cards, userInfo] = yield Promise.all([
                videoModel_1.default.find({
                    userId: req.userId,
                    createdAt: { $gte: durationAgo },
                })
                    .select("title views likes card watchTime createdAt")
                    .sort({ views: -1 })
                    .lean(),
                cardModel_1.default.find({
                    userId: req.userId,
                    createdAt: { $gte: durationAgo },
                })
                    .select("title name clicks saved link no createdAt")
                    .sort({ clicks: -1 })
                    .lean(),
                userModel_1.default.findById(req.userId)
                    .select("followers savedCardsCreator cardsClicksCreator picture")
                    .lean(),
            ]);
            if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.followers) {
                userInfo.followers = userInfo.followers.filter((follower) => follower.time > durationAgo);
                gainedFollowers = userInfo === null || userInfo === void 0 ? void 0 : userInfo.followers.filter((key) => key.create || 0).length;
                lostFollowers = userInfo === null || userInfo === void 0 ? void 0 : userInfo.followers.filter((key) => !key.create || 0).length;
            }
            if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.savedCardsCreator) {
                userInfo.savedCardsCreator = userInfo.savedCardsCreator.filter((card) => card.time > durationAgo);
            }
            if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.cardsClicksCreator) {
                userInfo.cardsClicksCreator = userInfo.cardsClicksCreator.filter((card) => card > durationAgo);
            }
        }
        res.status(200).json({
            message: "Data found.",
            videos,
            cards,
            userInfo: Object.assign(Object.assign({}, userInfo), { gainedFollowers,
                lostFollowers, followers: [], savedCards: ((_a = userInfo === null || userInfo === void 0 ? void 0 : userInfo.savedCardsCreator) === null || _a === void 0 ? void 0 : _a.length) || 0, cardsClicks: ((_b = userInfo === null || userInfo === void 0 ? void 0 : userInfo.cardsClicksCreator) === null || _b === void 0 ? void 0 : _b.length) || 0 }),
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: error.message });
    }
}));
//get data as a viewer
exports.getDataViewer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
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
        data = yield userModel_1.default.findById(req.userId)
            .select("likeVideosViewer cardsClicksViewer savedCardsViewer")
            .lean();
        if (duration !== "ever") {
            const durationAgo = getPastDate(duration);
            data = yield userModel_1.default.findById(req.userId)
                .select("likeVideosViewer cardsClicksViewer savedCardsViewer ")
                .lean();
            if (data === null || data === void 0 ? void 0 : data.likeVideosViewer) {
                data.likeVideosViewer = data.likeVideosViewer.filter((key) => key.time > durationAgo);
            }
            if (data === null || data === void 0 ? void 0 : data.cardsClicksViewer) {
                data.cardsClicksViewer = data.cardsClicksViewer.filter((key) => key > durationAgo);
            }
            if (data === null || data === void 0 ? void 0 : data.savedCardsViewer) {
                data.savedCardsViewer = data.savedCardsViewer.filter((key) => key.time > durationAgo);
            }
        }
        res.status(200).json({
            message: "Data found.",
            userInfo: {
                likeVideos: ((_a = data === null || data === void 0 ? void 0 : data.likeVideosViewer) === null || _a === void 0 ? void 0 : _a.length) || 0,
                cardsClicks: ((_b = data === null || data === void 0 ? void 0 : data.cardsClicksViewer) === null || _b === void 0 ? void 0 : _b.length) || 0,
                savedCards: ((_c = data === null || data === void 0 ? void 0 : data.savedCardsViewer) === null || _c === void 0 ? void 0 : _c.length) || 0,
            },
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: error.message });
    }
}));
