import {
  GETMYVIDEOS,
  GETVIDEOS,
  PUBLISHVIDEO,
  RECORDVIEW,
} from "@/utils/constant";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import {
  GetMyVideosError,
  GetMyVideosSuccess,
  GetUserVideosError,
  GetUserVideosSuccess,
  GetVideoError,
  GetVideosError,
  GetVideosSuccess,
  GetVideoSuccess,
  PublishError,
  PublishSuccess,
  RecordVideoError,
  RecordVideoSuccess,
} from "@/types/videoApiType";
import { useRouter } from "next/navigation";

const useVideo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const token = Cookies.get("token");
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const idConfig = (videoId: number, userName?: string) => ({
    headers: {
      "content-type": "application/json",
      "x-access-token": token,
      "x-video-id": videoId,
      ...(userName && { "x-username": userName }),
    },
  });

  //publish video
  const publish = async (
    data: FormData
  ): Promise<PublishSuccess | PublishError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<PublishSuccess | PublishError> =
        await axios.post(PUBLISHVIDEO, data, config);
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
          return { message: "Access denied. No token provided." };
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
  //fetch the video detail
  const getVideo = async (
    videoId: number
  ): Promise<GetVideoSuccess | GetVideoError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<GetVideoSuccess | GetVideoError> =
        await axios.get(GETVIDEOS, idConfig(videoId));
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
  //record the number of vieo view
  const recordVideo = async (
    videoId: number,
    time: number
  ): Promise<RecordVideoSuccess | RecordVideoError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<RecordVideoSuccess | RecordVideoError> =
        await axios.put(RECORDVIEW, { videoId, time }, config);
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
  //get my videos
  const getUserVideos = async (
    videoId: number,
    userName: string
  ): Promise<GetUserVideosSuccess | GetUserVideosError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<GetUserVideosSuccess | GetUserVideosError> =
        await axios.get(GETMYVIDEOS, idConfig(videoId, userName));
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

  return {
    publish,
    getVideos,
    getMyVideos,
    getUserVideos,
    getVideo,
    recordVideo,
    loading,
  };
};
export default useVideo;
