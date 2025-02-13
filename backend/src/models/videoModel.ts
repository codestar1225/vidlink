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
  userId:  mongoose.Schema.Types.ObjectId;
  title: string;
  videoLink: string;
  duration: number;
  cards: Card[];
  viewers: string[];
  followers: string[];
  watchTime: number;
  dailyView: Record<string, number>;
  monthlyView: Record<string, number>;
  yearlyView: Record<string, number>;
  totalView: number;
}

const VideoSchema = new Schema<IVideo>(
  {
    userId: { type:  mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    videoLink: { type: String, default: "" },
    duration: { type: Number },
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
    viewers: { type: [String], default: [] },
    followers: { type: [String], default: [] },
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
  options: { select: "username" }, // Select only userName
});

const Video: Model<IVideo> = mongoose.model<IVideo>("Video", VideoSchema);

export default Video;
