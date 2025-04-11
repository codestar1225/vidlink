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
exports.storeVideoFile = exports.setUserInfo = exports.checkUserName = exports.publishVideo = void 0;
const videoModel_1 = __importDefault(require("../../models/videoModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const cardModel_1 = __importDefault(require("../../models/cardModel"));
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    logger: console, // Debugging
});
// publish video and card
exports.publishVideo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userId) {
        res.status(400).json({ message: "No provided user Id." });
        return;
    }
    const { videoLink, duration, title, cards } = req.body;
    const file = req.file;
    let parsedCards;
    try {
        parsedCards = typeof cards === "string" ? JSON.parse(cards) : cards;
    }
    catch (error) {
        res.status(400).json({ message: "Invalid cards data" });
        return;
    }
    try {
        let finalVideoLink = videoLink;
        if (file) {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `videos/${Date.now()}-${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: client_s3_1.ObjectCannedACL.public_read,
            };
            console.log("Starting S3 upload...");
            const upload = new lib_storage_1.Upload({
                client: s3Client,
                params: params,
            });
            try {
                const s3Response = yield upload.done();
                console.log("S3 upload successful");
                finalVideoLink = s3Response.Location;
            }
            catch (error) {
                console.error("Error uploading to S3:", error);
                throw new Error("Failed to upload video to S3");
            }
        }
        if (!finalVideoLink) {
            res.status(400).json({ message: "Video link is required" });
            return;
        }
        const video = new videoModel_1.default({
            userId: req.userId,
            videoLink: finalVideoLink,
            duration: Number(duration),
            title,
            card: parsedCards.length,
        });
        yield video.save();
        yield Promise.all(parsedCards.map((card) => cardModel_1.default.create(Object.assign(Object.assign({}, card), { videoId: video._id, userId: req.userId, title: video.title, savers: card.isSaved
                ? [{ time: new Date(), userId: req.userId }]
                : [], isSaved: false }))));
        yield userModel_1.default.updateOne({ _id: req.userId }, {
            $inc: {
                totalVideos: 1,
                totalCards: parsedCards.length,
            },
        });
        res
            .status(201)
            .json({ message: "Video created", videoLink: finalVideoLink });
    }
    catch (error) {
        console.error("Error in publishVideo:", error);
        res.status(500).json({
            message: error.message || "An error occurred while publishing the video",
        });
    }
}));
//check the user name
exports.checkUserName = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req.body;
    if (!userName) {
        res.status(400).json({ message: "No user name provided." });
        return;
    }
    try {
        const isAlreadyName = yield userModel_1.default.findOne({ userName: userName })
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
//set user info
exports.setUserInfo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, gender, bio, instagram, tiktok, youtube, linkedin } = req.body;
    const file = req.file;
    try {
        let picture = undefined;
        if (file) {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `avatar/${Date.now()}-${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: client_s3_1.ObjectCannedACL.public_read,
            };
            console.log("Starting S3 upload...");
            const upload = new lib_storage_1.Upload({
                client: s3Client,
                params: params,
            });
            try {
                const s3Response = yield upload.done();
                console.log("S3 upload successful");
                picture = s3Response.Location;
            }
            catch (error) {
                console.error("Error uploading to S3:", error);
                throw new Error("Failed to upload video to S3");
            }
        }
        const isAlreadyName = yield userModel_1.default.findOne({ userName: userName })
            .select("userName")
            .lean();
        if (isAlreadyName && isAlreadyName._id != req.userId && userName) {
            res.status(400).json({ message: "Already exist user name." });
            return;
        }
        const userInfo = yield userModel_1.default.findByIdAndUpdate({ _id: req.userId }, {
            userName,
            picture,
            gender,
            bio,
            instagram,
            tiktok,
            youtube,
            linkedin,
        }, { runValidators: true, new: true });
        res.status(200).json({
            message: "User info saved.",
            user: { userName, picture: userInfo === null || userInfo === void 0 ? void 0 : userInfo.picture },
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.storeVideoFile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userId) {
        res.status(400).json({ message: "No provided user Id." });
        return;
    }
    const file = req.file;
    if (!file) {
        res.status(400).json({ message: "Video file is required" });
        return;
    }
    try {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `videos/${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: client_s3_1.ObjectCannedACL.public_read,
        };
        console.log("Starting S3 upload...");
        const upload = new lib_storage_1.Upload({
            client: s3Client,
            params,
        });
        const s3Response = yield upload.done();
        console.log("S3 upload successful");
        res.status(200).json({
            message: "Video upload successful.",
            videoLink: s3Response.Location || "",
        });
        return;
    }
    catch (error) {
        console.error("Error uploading to S3:", error);
        res.status(500).json({ message: "Failed to upload video to S3" });
        return;
    }
}));
