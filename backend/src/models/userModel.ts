import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  name:  String;
  picture: string;
  gender: string;
  bio: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
  role: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, },
    username: { type: String },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },
    bio: { type: String },
    instagram: { type: String },
    tiktok: { type: String },
    youtube: { type: String },
    linkedin: { type: String },
    role: { type: String, enum: ["admin", "customer"] },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);