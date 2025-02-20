import {
  ADDLIKE,
  CHECKUSERNAME,
  FOLLOWUSER,
  GETMYVIDEOS,
  GETUSERINFO,
  GETUSERNAME,
  GETUSERVIDEOS,
  GETVIDEO,
  GETVIDEOS,
  PUBLISHVIDEO,
  SAVECARD,
  SETUSERINFO,
} from "@/utils/constant";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import {
  AddLikeError,
  AddLikeSuccess,
  CheckUserNameError,
  CheckUserNameSuccess,
  FollowStatusError,
  FollowStatusSccess,
  GetMyVideosError,
  GetMyVideosSuccess,
  GetUserInfoError,
  GetUserInfoSuccess,
  GetUserNameError,
  GetUserNameSuccess,
  GetUserVideosError,
  GetUserVideosSuccess,
  GetVideoError,
  GetVideosError,
  GetVideosSuccess,
  GetVideoSuccess,
  PublishError,
  PublishSuccess,
  SaveCardError,
  SaveCardSuccess,
  SetUserInfoError,
  SetUserInfoSuccess,
} from "@/types/videoApiType";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { tokenAtom } from "@/store";

const useVideo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [, setToken] = useAtom<string>(tokenAtom);
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
          setToken("");
          Cookies.remove("token");
          Cookies.remove("user");
          router.push("/signin");
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
          return { message: "Something went wrong" };
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
          return { message: "Something went wrong" };
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
          setToken("");
          Cookies.remove("token");
          Cookies.remove("user");
          router.push("/signin");
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
          setToken("");
          Cookies.remove("token");
          Cookies.remove("user");
          router.push("/signin");
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
          return { message: "Something went wrong" };
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
          setToken("");
          Cookies.remove("token");
          Cookies.remove("user");
          router.push("/signin");
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
          setToken("");
          Cookies.remove("token");
          Cookies.remove("user");
          router.push("/signin");
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
    userInfo: FormData
  ): Promise<SetUserInfoSuccess | SetUserInfoError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<SetUserInfoSuccess | SetUserInfoError> =
        await axios.post(SETUSERINFO, userInfo, multiConfig);
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data?.message === "Token is invalid or has expired!"
        ) {
          setToken("");
          Cookies.remove("token");
          Cookies.remove("user");
          router.push("/signin");
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
  //check user name
  const checkUserName = async (
    userName: string
  ): Promise<CheckUserNameSuccess | CheckUserNameError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<CheckUserNameSuccess | CheckUserNameError> =
        await axios.post(CHECKUSERNAME, { userName }, config);
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data?.message === "Token is invalid or has expired!"
        ) {
          setToken("");
          Cookies.remove("token");
          Cookies.remove("user");
          router.push("/signin");
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
  //check user name
  const getUserName = async (): Promise<
    GetUserNameSuccess | GetUserNameError
  > => {
    setLoading(true);
    try {
      const res: AxiosResponse<GetUserNameSuccess | GetUserNameError> =
        await axios.get(GETUSERNAME, config);
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data?.message === "Token is invalid or has expired!"
        ) {
          setToken("");
          Cookies.remove("token");
          Cookies.remove("user");
          router.push("/signin");
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
  //save card
  const saveCard = async (
    cardId: string
  ): Promise<SaveCardSuccess | SaveCardError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<SaveCardSuccess | SaveCardError> =
        await axios.post(SAVECARD, { cardId }, config);
      return { ...res.data, status: res.status };
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data?.message === "Token is invalid or has expired!"
        ) {
          setToken("");
          Cookies.remove("token");
          Cookies.remove("user");
          router.push("/signin");
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
    checkUserName,
    getUserName,
    saveCard,
    loading,
  };
};
export default useVideo;
