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
exports.watchTime = exports.increaseClicks = exports.saveCard = exports.followUser = exports.addLike = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const videoModel_1 = __importDefault(require("../../models/videoModel"));
const cardModel_1 = __importDefault(require("../../models/cardModel"));
//add like
exports.addLike = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const videoId = req.header("x-video-id");
    if (!videoId) {
        res.status(400).json({ message: "No videoId provided." });
        return;
    }
    if (!req.userId) {
        res.status(400).json({ message: "No videoId userId." });
        return;
    }
    try {
        const videoInfo = yield videoModel_1.default.findById(videoId).select("userId").lean();
        if (req.userId === ((_a = videoInfo === null || videoInfo === void 0 ? void 0 : videoInfo.userId) === null || _a === void 0 ? void 0 : _a.toString())) {
            res.status(400).json({ message: "you can't add yourself." });
            return;
        }
        const userData = yield userModel_1.default.findById(req.userId)
            .select("likeVideosViewer")
            .lean();
        if ((_b = userData === null || userData === void 0 ? void 0 : userData.likeVideosViewer) === null || _b === void 0 ? void 0 : _b.some((key) => key.videoId === videoId)) {
            yield Promise.all([
                videoModel_1.default.updateOne({ _id: videoId }, { $inc: { likes: -1 } }),
                userModel_1.default.updateOne({ _id: videoInfo === null || videoInfo === void 0 ? void 0 : videoInfo.userId }, {
                    $pull: {
                        likeVideosCreator: { userId: req.userId, videoId },
                    },
                }),
                userModel_1.default.updateOne({ _id: req.userId }, { $pull: { likeVideosViewer: { videoId } } }),
            ]);
            res.status(200).json({ message: "Like removed.", like: false });
        }
        else {
            yield Promise.all([
                videoModel_1.default.updateOne({ _id: videoId }, { $inc: { likes: 1 } }),
                userModel_1.default.updateOne({ _id: videoInfo === null || videoInfo === void 0 ? void 0 : videoInfo.userId }, {
                    $addToSet: {
                        likeVideosCreator: {
                            time: new Date(),
                            videoId,
                            userId: req.userId,
                        },
                    },
                }),
                userModel_1.default.updateOne({ _id: req.userId }, { $addToSet: { likeVideosViewer: { time: new Date(), videoId } } }),
            ]);
            res.status(200).json({ message: "Like added.", like: true });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
//follow the user
exports.followUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
        const userData = yield userModel_1.default.findById(targetUserId).select("followers");
        const follower = (_a = userData === null || userData === void 0 ? void 0 : userData.followers) === null || _a === void 0 ? void 0 : _a.find((follower) => follower.userId === req.userId);
        if (follower) {
            yield userModel_1.default.updateOne({ _id: targetUserId }, {
                $set: {
                    "followers.$[elem].time": new Date(),
                    "followers.$[elem].create": !follower.create,
                },
            }, {
                runValidators: true,
                arrayFilters: [{ "elem.userId": req.userId }], // ✅ Update only the matched follower
            });
            res.status(200).json({
                message: follower.create
                    ? "Unfollowed the user."
                    : "Followed the user.",
                followStatus: !follower.create,
            });
        }
        else {
            // forllow firstly.
            yield userModel_1.default.updateOne({ _id: targetUserId }, {
                $addToSet: {
                    followers: { time: new Date(), create: true, userId: req.userId },
                },
            }, { runValidators: true });
            res
                .status(200)
                .json({ message: "Followed the user.", followStatus: true });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
//save card
exports.saveCard = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
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
        const card = yield cardModel_1.default.findById(cardId).select("savers userId").lean();
        if (!card) {
            res.status(404).json({ message: "Card not found." });
            return;
        }
        // increasing the clicks of card in terms of not user.
        if (req.userId !== ((_a = card === null || card === void 0 ? void 0 : card.userId) === null || _a === void 0 ? void 0 : _a.toString())) {
            yield Promise.all([
                cardModel_1.default.updateOne({ _id: cardId }, { $inc: { clicks: 1 } }),
                userModel_1.default.updateOne({ _id: req.userId }, {
                    $addToSet: { cardsClicksViewer: new Date() },
                }),
                userModel_1.default.updateOne({ _id: card === null || card === void 0 ? void 0 : card.userId }, {
                    $addToSet: { cardsClicksCreator: new Date() },
                }),
            ]);
        }
        if (card === null || card === void 0 ? void 0 : card.savers.some((key) => key.userId === req.userId)) {
            if (req.userId === ((_b = card === null || card === void 0 ? void 0 : card.userId) === null || _b === void 0 ? void 0 : _b.toString())) {
                yield cardModel_1.default.updateOne({ _id: cardId }, {
                    $pull: { savers: { userId: req.userId } },
                });
            }
            else {
                yield Promise.all([
                    cardModel_1.default.updateOne({ _id: cardId }, {
                        $pull: { savers: { userId: req.userId } },
                        $inc: { saved: -1 },
                    }),
                    userModel_1.default.updateOne({ _id: req.userId }, {
                        $pull: { savedCardsViewer: { cardId: cardId } },
                    }),
                    userModel_1.default.updateOne({ _id: card.userId }, {
                        $pull: {
                            savedCardsCreator: { userId: req.userId, cardId: cardId },
                        },
                    }),
                ]);
            }
            res.status(200).json({
                message: "Unsaved card.",
                saved: false,
            });
        }
        else {
            const saveEntry = { time: new Date(), userId: req.userId };
            if (req.userId === ((_c = card === null || card === void 0 ? void 0 : card.userId) === null || _c === void 0 ? void 0 : _c.toString())) {
                yield cardModel_1.default.updateOne({ _id: cardId }, {
                    $addToSet: { savers: saveEntry },
                });
            }
            else {
                yield Promise.all([
                    cardModel_1.default.updateOne({ _id: cardId }, {
                        $addToSet: { savers: saveEntry },
                        $inc: { saved: 1 },
                    }),
                    userModel_1.default.updateOne({ _id: req.userId }, {
                        $addToSet: {
                            savedCardsViewer: { time: new Date(), cardId },
                        },
                    }),
                    userModel_1.default.updateOne({ _id: card.userId }, {
                        $addToSet: {
                            savedCardsCreator: {
                                time: new Date(),
                                cardId,
                                userId: req.userId,
                            },
                        },
                    }),
                ]);
            }
            res.status(200).json({
                message: "Saved card.",
                saved: true,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}));
// increase the card clicks.
exports.increaseClicks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cardId } = req.body;
    if (!cardId) {
        res.status(400).json({ message: "No provided card Id." });
    }
    try {
        const card = yield cardModel_1.default.findById(cardId).select("userId").lean();
        if (req.userId) {
            if (req.userId !== (card === null || card === void 0 ? void 0 : card.userId.toString())) {
                yield Promise.all([
                    cardModel_1.default.updateOne({ _id: cardId }, { $inc: { clicks: 1 } }),
                    userModel_1.default.updateOne({ _id: req.userId }, {
                        $addToSet: { cardsClicksViewer: new Date() },
                    }),
                    userModel_1.default.updateOne({ _id: card === null || card === void 0 ? void 0 : card.userId }, {
                        $addToSet: { cardsClicksCreator: new Date() },
                    }),
                ]);
            }
        }
        else {
            yield Promise.all([
                yield cardModel_1.default.updateOne({ _id: cardId }, { $inc: { clicks: 1 } }),
                yield userModel_1.default.updateOne({ _id: card === null || card === void 0 ? void 0 : card.userId }, {
                    $addToSet: { cardsClicksCreator: new Date() },
                }),
            ]);
        }
        res.status(200).json({ message: "Clicks increased." });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}));
// record the video watch time
exports.watchTime = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { watchTime, videoId } = req.body;
    if (!watchTime) {
        res.status(400).json({ message: "No provided watch time." });
    }
    if (!videoId) {
        res.status(400).json({ message: "No provided videoId." });
    }
    if (req.userId) {
        return;
    }
    try {
        yield videoModel_1.default.updateOne({ _id: videoId }, {
            $inc: { watchTime: Math.floor(watchTime) },
        });
        const user = yield videoModel_1.default.findById(videoId).select("userId").lean();
        yield userModel_1.default.updateOne({ _id: user === null || user === void 0 ? void 0 : user.userId }, {
            $inc: { watchTime: Math.floor(watchTime) },
        });
        // console.log("watchtime success", watchTime);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
