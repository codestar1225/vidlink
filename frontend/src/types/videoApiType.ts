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
  user: { _id: string; userName: string };
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
  totalVideos: number;
  like: boolean;
  owner: boolean;
};
type VideoInfo = {
  title: string;
  videoLink: string;
  duration: number;
  userId: string;
  cards: CardType[];
};
export interface GetVideoSuccess {
  userInfo: User;
  videoInfo: VideoInfo;
  cards: CardType[];
  userVideos: { videoLink: string; _id: string }[];
  relatedVideos: { videoLink: string; _id: string }[];
  followStatus: boolean;
  message: string;
  status: number;
}
export interface GetVideoError {
  message: string;
  status?: number;
}

// add like
export interface AddLikeSuccess {
  like: boolean;
  message: string;
  status: number;
}
export interface AddLikeError {
  message: string;
  status?: number;
}

//get my videos
type UserInfo = {
  _id: string;
  userName: string;
  picture: string;
  followers: number;
  totalVideos: number;
  totalCards: number;
  instagram: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
  email?: string;
};
export interface GetMyVideosSuccess {
  userInfo: UserInfo;
  myVideos: {
    videoLink: string;
    title: string;
    _id: string;
    cards: CardType[];
  }[];
  myLikesVideos: { videoLink: string; title: string; _id: string }[];
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
  userVideos: { videoLink: string; _id: string }[];
  followStatus: boolean;
  status: number;
  message: string;
}
export interface GetUserVideosError {
  message: string;
  status?: number;
}
//follow the user
export interface FollowStatusSccess {
  followStatus: boolean;
  status: number;
  message: string;
}
export interface FollowStatusError {
  message: string;
  status?: number;
}

//get user info
export interface GetUserInfoSuccess {
  userInfo: {
    userName: string;
    picture: string;
    gender: string;
    bio: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    linkedin: string;
  };
  status: number;
  message: string;
}
export interface GetUserInfoError {
  message: string;
  status?: number;
}
//set user info
export interface SetUserInfoSuccess {
  status: number;
  message: string;
}
export interface SetUserInfoError {
  message: string;
  status?: number;
}
