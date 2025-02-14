import mongoose, { Document, Schema, Model } from "mongoose";

interface ICard extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  link: string;
  name: string;
  icon: string;
  start: number;
  no: number;
  isSaved: boolean;
}

const CardSchema = new Schema<ICard>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    link: { type: String, default: "" },
    name: { type: String, default: "" },
    icon: { type: String, default: "" },
    start: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    isSaved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Card: Model<ICard> = mongoose.model<ICard>("Card", CardSchema);

export default Card;
