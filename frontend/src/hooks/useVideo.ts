import {
  ADDLIKE,
  GETMYVIDEOS,
  GETVIDEO,
  GETVIDEOS,
  PUBLISHVIDEO,
  RECORDVIEW,
} from "@/utils/constant";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import {
  AddLikeError,
  AddLikeSuccess,
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
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const idConfig = (videoId: string) => ({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-video-id": videoId,
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
        await axios.get(GETVIDEO, idConfig(videoId));
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
  //record the number of vieo view
  const addLike = async (
    videoId: string
  ): Promise<AddLikeSuccess | AddLikeError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<AddLikeSuccess | AddLikeError> = await axios.put(
        ADDLIKE,
        { videoId: videoId },
        idConfig(videoId)
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
  const recordVideo = async (
    videoId: string,
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
    videoId: string
  ): Promise<GetUserVideosSuccess | GetUserVideosError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<GetUserVideosSuccess | GetUserVideosError> =
        await axios.get(GETMYVIDEOS, idConfig(videoId));
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
    addLike,
    getMyVideos,
    getUserVideos,
    getVideo,
    recordVideo,
    loading,
  };
};
export default useVideo;
