import {
  ADDLIKE,
  FOLLOWUSER,
  GETMYVIDEOS,
  GETUSERINFO,
  GETUSERVIDEOS,
  GETVIDEO,
  GETVIDEOS,
  PUBLISHVIDEO,
} from "@/utils/constant";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import {
  AddLikeError,
  AddLikeSuccess,
  FollowStatusError,
  FollowStatusSccess,
  GetMyVideosError,
  GetMyVideosSuccess,
  GetUserInfoError,
  GetUserInfoSuccess,
  GetUserVideosError,
  GetUserVideosSuccess,
  GetVideoError,
  GetVideosError,
  GetVideosSuccess,
  GetVideoSuccess,
  PublishError,
  PublishSuccess,
  SetUserInfoError,
  SetUserInfoSuccess,
} from "@/types/videoApiType";
import { useRouter } from "next/navigation";

const useVideo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const token = Cookies.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const videoIdConfig = (videoId: string) => ({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-video-id": videoId,
    },
  });
  const userIdConfig = (userId: string) => ({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-user-id": userId,
    },
  });
  const multiConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  //publish video
  const publish = async (
    data: FormData
  ): Promise<PublishSuccess | PublishError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<PublishSuccess | PublishError> =
        await axios.post(PUBLISHVIDEO, data, multiConfig);
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data?.message === "Token is invalid or has expired!"
        ) {
          router.push("/signin");
          Cookies.remove("token");
          return { message: "Your session was expired. Please log in again." };
        } else {
          return { message: error?.response?.data?.message };
        }
      }
      return { message: "An unknown error occurred" };
    } finally {
      setLoading(false);
    }
  };

  //fetch the videos data
  const getVideos = async (): Promise<GetVideosSuccess | GetVideosError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<GetVideosSuccess | GetVideosError> =
        await axios.get(GETVIDEOS, config);
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message };
        }
      }
      return { message: "An unknown error occurred" };
    } finally {
      setLoading(false);
    }
  };
  //fetch the video detail
  const getVideo = async (
    videoId: string
  ): Promise<GetVideoSuccess | GetVideoError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<GetVideoSuccess | GetVideoError> =
        await axios.get(GETVIDEO, videoIdConfig(videoId));
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message };
        }
      }
      return { message: "An unknown error occurred" };
    } finally {
      setLoading(false);
    }
  };

  //add like
  const addLike = async (
    videoId: string
  ): Promise<AddLikeSuccess | AddLikeError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<AddLikeSuccess | AddLikeError> = await axios.put(
        ADDLIKE,
        {},
        videoIdConfig(videoId)
      );
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data?.message === "Token is invalid or has expired!"
        ) {
          return { message: "Your session was expired. Please log in again." };
        } else {
          return { message: "Something went wrong" };
        }
      }
      return { message: "An unknown error occurred" };
    } finally {
      setLoading(false);
    }
  };

  //get my videos
  const getMyVideos = async (): Promise<
    GetMyVideosSuccess | GetMyVideosError
  > => {
    setLoading(true);
    try {
      const res: AxiosResponse<GetMyVideosSuccess | GetMyVideosError> =
        await axios.get(GETMYVIDEOS, config);
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data?.message === "Token is invalid or has expired!"
        ) {
          return { message: "Your session was expired. Please log in again." };
        } else {
          return { message: "Something went wrong" };
        }
      }
      return { message: "An unknown error occurred" };
    } finally {
      setLoading(false);
    }
  };
  //get user videos
  const getUserVideos = async (
    userId: string
  ): Promise<GetUserVideosSuccess | GetUserVideosError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<GetUserVideosSuccess | GetUserVideosError> =
        await axios.get(GETUSERVIDEOS, userIdConfig(userId));
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.message) {
          return { message: error?.response?.data?.message };
        }
      }
      return { message: "An unknown error occurred" };
    } finally {
      setLoading(false);
    }
  };
  //follow the user
  const followUser = async (
    userId: string
  ): Promise<FollowStatusSccess | FollowStatusError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<FollowStatusSccess | FollowStatusError> =
        await axios.put(FOLLOWUSER, {}, userIdConfig(userId));
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data?.message === "Token is invalid or has expired!"
        ) {
          return { message: "Your session was expired. Please log in again." };
        } else {
          return { message: "Something went wrong" };
        }
      }
      return { message: "An unknown error occurred" };
    } finally {
      setLoading(false);
    }
  };
  //get user info
  const getUserInfo = async (): Promise<
    GetUserInfoSuccess | GetUserInfoError
  > => {
    setLoading(true);
    try {
      const res: AxiosResponse<GetUserInfoSuccess | GetUserInfoError> =
        await axios.get(GETUSERINFO, config);
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data?.message === "Token is invalid or has expired!"
        ) {
          return { message: "Your session was expired. Please log in again." };
        } else {
          return { message: "Something went wrong" };
        }
      }
      return { message: "An unknown error occurred" };
    } finally {
      setLoading(false);
    }
  };
  //set user info

  const setUserInfo = async (
    userInfo: string
  ): Promise<SetUserInfoSuccess | SetUserInfoError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<SetUserInfoSuccess | SetUserInfoError> =
        await axios.put(GETUSERINFO, userInfo, config);
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data?.message === "Token is invalid or has expired!"
        ) {
          return { message: "Your session was expired. Please log in again." };
        } else {
          return { message: "Something went wrong" };
        }
      }
      return { message: "An unknown error occurred" };
    } finally {
      setLoading(false);
    }
  };

  return {
    publish,
    getVideos,
    addLike,
    getMyVideos,
    getUserVideos,
    getVideo,
    followUser,
    getUserInfo,
    setUserInfo,
    loading,
  };
};
export default useVideo;
