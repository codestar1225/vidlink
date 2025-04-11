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
exports.getUserName = exports.getUserInfo = exports.getUserVideos = exports.getCards = exports.getMyVideos = exports.getVideo = exports.getVideos = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const videoModel_1 = __importDefault(require("../../models/videoModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const cardModel_1 = __importDefault(require("../../models/cardModel"));
//get videos
exports.getVideos = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allVideos = yield videoModel_1.default.find({})
            .select("videoLink views title userId _id")
            .populate("user")
            .lean();
        if (!req.userId) {
            res.status(200).json({ message: "All videos found.", allVideos });
            return;
        }
        else {
            const following = yield userModel_1.default.find({
                followers: { $elemMatch: { userId: req.userId, create: true } },
            })
                .select("_id")
                .lean();
            const followingUserIds = (following === null || following === void 0 ? void 0 : following.map((follower) => follower._id)) || [];
            const followingVideos = yield videoModel_1.default.find({
                userId: { $in: followingUserIds },
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
    }
    catch (error) {
        console.log("getVideos", error);
        res.status(500).json({ message: error.message });
    }
}));
//get video detail
exports.getVideo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videoId = req.header("x-video-id");
    if (!videoId) {
        res.status(400).json({ message: "No videoId provided." });
        return;
    }
    try {
        const videoInfo = yield videoModel_1.default.findById(videoId)
            .select("userId title videoLink duration")
            .populate("cards")
            .lean();
        if (!videoInfo) {
            res.status(404).json({ message: "Video not found." });
            return;
        }
        const userInfo = yield userModel_1.default.findById(videoInfo.userId)
            .select("totalVideos userName followers picture")
            .lean();
        const userVideos = yield videoModel_1.default.find({ userId: videoInfo.userId })
            .select("videoLink _id")
            .lean();
        const relatedVideos = yield videoModel_1.default.find({}).select("videoLink _id").lean();
        let like = false;
        let owner = false;
        let followStatus = false;
        if (req.userId) {
            const user = yield userModel_1.default.findById(req.userId)
                .select("likeVideosViewer")
                .lean();
            if (user && user.likeVideosViewer) {
                like = user.likeVideosViewer.some((key) => key.videoId === videoId);
            }
            if (videoInfo.userId.toString() === req.userId) {
                owner = true;
            }
            if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.followers) {
                followStatus = userInfo === null || userInfo === void 0 ? void 0 : userInfo.followers.some((key) => key.userId === req.userId && key.create);
            }
            if (videoInfo === null || videoInfo === void 0 ? void 0 : videoInfo.cards) {
                videoInfo.cards.forEach((card) => {
                    card.isSaved = card.savers.some((key) => key.userId === req.userId);
                    card.savers = [];
                });
            }
            if (req.userId !== videoInfo.userId.toString()) {
                yield Promise.all([
                    userModel_1.default.updateOne({ _id: userInfo === null || userInfo === void 0 ? void 0 : userInfo._id }, {
                        $addToSet: { videoViews: new Date() },
                    }),
                    videoModel_1.default.updateOne({ _id: videoId }, { $inc: { views: 1 } }),
                ]);
            }
        }
        else {
            yield Promise.all([
                userModel_1.default.updateOne({ _id: userInfo === null || userInfo === void 0 ? void 0 : userInfo._id }, {
                    $addToSet: { videoViews: new Date() },
                }),
                videoModel_1.default.updateOne({ _id: videoId }, { $inc: { views: 1 } }),
            ]);
        }
        res.status(200).json({
            message: "Video found",
            videoInfo,
            userInfo: Object.assign(Object.assign({}, userInfo), { like, owner, followers: [] }),
            userVideos,
            relatedVideos,
            followStatus,
        });
    }
    catch (error) {
        console.error("getVideo", error);
        res.status(500).json({ message: error.message });
    }
}));
//get my videos
exports.getMyVideos = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.userId) {
        res.status(400).json({ message: "No provided userId." });
        return;
    }
    try {
        const myVideos = yield videoModel_1.default.find({ userId: req.userId })
            .select("videoLink title")
            .lean();
        const likes = yield userModel_1.default.findById(req.userId)
            .select("likeVideosViewer")
            .lean();
        const likeVideosIds = ((_a = likes === null || likes === void 0 ? void 0 : likes.likeVideosViewer) === null || _a === void 0 ? void 0 : _a.map((key) => key.videoId)) || [];
        const myLikesVideos = yield videoModel_1.default.find({
            _id: { $in: likeVideosIds },
        })
            .select("videoLink title")
            .lean();
        const userInfo = yield userModel_1.default.findById(req.userId)
            .select("totalVideos totalCards followers tiktok youtube linkedin instagram userName picture bio")
            .lean();
        const followingNumber = userInfo === null || userInfo === void 0 ? void 0 : userInfo.followers.filter((key) => key.create).length;
        res.status(200).json({
            message: "my videos found",
            myVideos,
            myLikesVideos,
            userInfo: Object.assign(Object.assign({}, userInfo), { followers: followingNumber }),
        });
    }
    catch (error) {
        console.log("getMyVideos", error);
        res.status(500).json({ message: error.message });
    }
}));
//get cards
exports.getCards = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userId) {
        res.status(400).json({ message: "No provided userId." });
        return;
    }
    try {
        //Fetch cards (Sorted by videoId & no in MongoDB itself)
        const cards = yield cardModel_1.default.find({
            $or: [{ userId: req.userId }, { "savers.userId": req.userId }],
        })
            .sort({ videoId: 1, no: 1 })
            .lean();
        // Extract unique userIds from the cards
        const userIds = [...new Set(cards.map((card) => card.userId))];
        // Fetch all usernames in one query
        const users = yield userModel_1.default.find({ _id: { $in: userIds } })
            .select("userName")
            .lean();
        // Create a lookup dictionary { userId: userName }
        const userMap = {};
        users.forEach((user) => {
            userMap[user._id.toString()] = user.userName;
        });
        // Process cards & group them
        const groupedCards = [];
        for (const card of cards) {
            card.isSaved = card.savers.some((key) => key.userId === req.userId);
            card.savers = []; // Clear savers list for security reasons
            let group = groupedCards.find((g) => g.videoId === String(card.videoId));
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
    }
    catch (error) {
        console.log("getCards", error);
        res.status(500).json({ message: error.message });
    }
}));
// get the user videos
exports.getUserVideos = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.header("x-user-id");
    if (!userId) {
        res.status(400).json({ message: "No userId provided." });
        return;
    }
    try {
        const userVideos = yield videoModel_1.default.find({ userId: userId })
            .select("videoLink")
            .lean();
        const userInfo = yield userModel_1.default.findById(userId)
            .select("totalVideos totalCards followers tiktok youtube linkedin instagram userName picture email")
            .lean();
        yield userModel_1.default.findByIdAndUpdate(userId, { $inc: { profileViews: 1 } });
        let followStatus = false;
        if (req.userId && (userInfo === null || userInfo === void 0 ? void 0 : userInfo.followers)) {
            followStatus = userInfo === null || userInfo === void 0 ? void 0 : userInfo.followers.some((key) => key.userId === req.userId);
        }
        const followingNumber = userInfo === null || userInfo === void 0 ? void 0 : userInfo.followers.filter((key) => key.create).length;
        res.status(200).json({
            message: "my videos found",
            userVideos,
            userInfo: Object.assign(Object.assign({}, userInfo), { followers: followingNumber }),
            followStatus,
        });
    }
    catch (error) {
        console.log("getUserVideos", error);
        res.status(500).json({ message: error.message });
    }
}));
//get user info
exports.getUserInfo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userId) {
        res.status(400).json({ message: "No userId provided." });
        return;
    }
    try {
        const userInfo = yield userModel_1.default.findById(req.userId)
            .select("userName picture gender bio instagram tiktok youtube linkedin")
            .lean();
        const checkingNames = yield userModel_1.default.find({}).select("userName").lean();
        res
            .status(200)
            .json({ message: "user info found.", userInfo, checkingNames });
    }
    catch (error) {
        console.log("getUserInfo", error);
        res.status(500).json({ message: error.message });
    }
}));
//get user name
exports.getUserName = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = yield userModel_1.default.findById(req.userId)
            .select("userName")
            .lean();
        res
            .status(200)
            .json({ message: "user info found.", userName: userName === null || userName === void 0 ? void 0 : userName.userName });
    }
    catch (error) {
        console.log("getUserName", error);
        res.status(500).json({ message: error.message });
    }
}));
