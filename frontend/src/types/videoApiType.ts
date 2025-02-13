import { CardType } from "@/store";

//publish video
export interface PublishSuccess {
  videoLink: string;
  duration: number;
  title: string;
  cards: CardType[];
  message: string;
  status: number;
}
export interface PublishError {
  message: string;
  status?: number;
}

//get videos
type Video = {
  videoLink: string;
  totalView: number;
  user: { _id: string; username: string };
  _id: string;
};
export interface GetVideosSuccess {
  allVideos?: Video[];
  followingVideos?: Video[];
  status: number;
  message: string;
}
export interface GetVideosError {
  message: string;
  status?: number;
}

//get video detail
type User = {
  userName: string;
  likes: boolean;
  videosAmount: number;
};
type VideoInfo = {
  title: string;
  videoLink: string;
  videoId: number;
  duration: number;
};
export interface GetVideoSuccess {
  userInfo: User;
  videoInfo: VideoInfo;
  cards: CardType[];
  userVideos: { src: string; videoId: string }[];
  relatedVideos: { src: string; videoId: string }[];
  message: string;
  status: number;
}
export interface GetVideoError {
  message: string;
  status?: number;
}

// record views and watching time
export interface RecordVideoSuccess {
  message: string;
  status: number;
}
export interface RecordVideoError {
  message: string;
  status?: number;
}

//get my videos
type UserInfo = {
  followersAmount: number;
  videosAmount: number;
  cardsAmount: number;
  instagram: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
};
export interface GetMyVideosSuccess {
  userInfo: UserInfo;
  videos: { src: string; videoId: string }[];
  cards: CardType[];
  status: number;
  message: string;
}
export interface GetMyVideosError {
  message: string;
  status?: number;
}

//get user's videos

export interface GetUserVideosSuccess {
  userInfo: UserInfo;
  videos: { src: string; videoId: string }[];
  status: number;
  message: string;
}
export interface GetUserVideosError {
  message: string;
  status?: number;
}
