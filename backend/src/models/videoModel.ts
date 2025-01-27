import mongoose, { Document, Schema } from 'mongoose';

interface IVideo extends Document {
  id: string;
  name: string;
  url: string;
  dailyView: object;
  monthlyView: object;
  yearlyView: object;
  totalView: Number;
}

const VideoSchema = new Schema<IVideo>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    url: { type: String },
    dailyView: { type: Object },
    monthlyView: { type: Object },
    yearlyView: { type: Object },
    totalView: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model<IVideo>('Video', VideoSchema);