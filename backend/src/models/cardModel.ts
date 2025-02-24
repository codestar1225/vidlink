import mongoose, { Document, Schema, Model } from "mongoose";

export interface ICard extends Document {
  videoId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  link: string;
  name: string;
  icon: string;
  start: number;
  no: number;
  isSaved: boolean;
  savers: string[];
  clicks: number;
  saved:number
}

const CardSchema = new Schema<ICard>(
  {
    videoId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    title: { type: String, required: true },
    link: { type: String, default: "" },
    name: { type: String, default: "" },
    icon: { type: String, default: "" },
    start: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    isSaved: { type: Boolean, default: false },
    savers: { type: [String], default: [] },
    clicks: { type: Number, default: 0 },
    saved: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Card: Model<ICard> = mongoose.model<ICard>("Card", CardSchema);

export default Card;
