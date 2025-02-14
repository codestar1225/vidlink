import mongoose, { Document, Schema, Model } from "mongoose";

type Card = {
  link: string;
  name: string;
  icon: string;
  start: number;
  no: number;
  isSaved: boolean;
};

interface IVideo extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  videoLink: string;
  duration: number;
  cards: Card[];
  views: number;
  likes: number;
  watchTime: number;
  dailyView: Record<string, number>;
  monthlyView: Record<string, number>;
  yearlyView: Record<string, number>;
  totalView: number;
}

const VideoSchema = new Schema<IVideo>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    videoLink: { type: String, required: true },
    cards: [
      {
        link: { type: String },
        name: { type: String },
        icon: { type: String },
        start: { type: Number },
        no: { type: Number },
        isSaved: { type: Boolean },
      },
    ],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },   
    watchTime: { type: Number, default: 0 },
    dailyView: { type: Object, default: {} },
    monthlyView: { type: Object, default: {} },
    yearlyView: { type: Object, default: {} },
    totalView: { type: Number, default: 0 },
  },
  { timestamps: true }
);

VideoSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true, // Ensures a single object (not an array)
  options: { select: "userName" }, // Select only userName
});

const Video: Model<IVideo> = mongoose.model<IVideo>("Video", VideoSchema);

export default Video;
