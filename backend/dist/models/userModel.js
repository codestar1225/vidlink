"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    userName: { type: String, default: "" },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other", ""] },
    bio: { type: String, fdefault: "" },
    instagram: { type: String, default: "" },
    tiktok: { type: String, default: "" },
    youtube: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    role: { type: String, enum: ["admin", "customer"] },
    followers: {
        type: [
            {
                time: { type: Date },
                create: { type: Boolean },
                userId: { type: String, required: true },
            },
        ],
        default: [],
    },
    totalVideos: { type: Number, default: 0 },
    totalCards: { type: Number, default: 0 },
    likeVideosViewer: {
        type: [
            {
                time: { type: Date, required: true },
                videoId: { type: String, required: true },
            },
        ],
        default: [],
    },
    likeVideosCreator: {
        type: [
            {
                time: { type: Date, required: true },
                videoId: { type: String, required: true },
                userId: { type: String, required: true },
            },
        ],
        default: [],
    },
    cardsClicksCreator: { type: [Date], default: [] },
    cardsClicksViewer: { type: [Date], default: [] },
    savedCardsCreator: {
        type: [
            {
                time: { type: Date, required: true },
                cardId: { type: String, required: true },
                userId: { type: String, required: true },
            },
        ],
        default: [],
    },
    savedCardsViewer: {
        type: [
            {
                time: { type: Date },
                cardId: { type: String, required: true },
            },
        ],
        default: [],
    },
    videoViews: { type: [Date], default: [] },
    profileViews: { type: Number, default: 0 },
    watchTime: { type: Number, default: 0 },
}, { timestamps: true });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
