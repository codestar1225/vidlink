import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  name: String;
  picture: string;
  userName: string;
  gender: string;
  bio: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
  role: string;
  totalVideos: number;
  totalCards: number;
  cardsClicksViewer: number;
  cardsClicksCreator: number;
  savedCardsViewer: number;
  savedCardsCreator: number;
  followers: string[];
  likeVideosViewer: string[];
  likeVideosCreator: number;
  videoViews: number;
  profileViews: number;
  watchTime: number;
}

const UserSchema = new Schema<IUser>(
  {
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
    followers: { type: [String], default: [] },
    likeVideosViewer: { type: [String], default: [] },
    likeVideosCreator: { type: Number, default: 0 },
    totalVideos: { type: Number, default: 0 },
    totalCards: { type: Number, default: 0 },
    cardsClicksViewer: { type: Number, default: 0 },
    cardsClicksCreator: { type: Number, default: 0 },
    savedCardsViewer: { type: Number, default: 0 },
    savedCardsCreator: { type: Number, default: 0 },
    videoViews: { type: Number, default: 0 },
    profileViews: { type: Number, default: 0 },
    watchTime: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
