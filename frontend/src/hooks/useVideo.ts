import { PUBLISHVIDEO, UPLOADVIDEO } from "@/utils/constant";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import {
  PublishError,
  PublishSuccess,
  UploadVideoError,
  UploadVideoSuccess,
} from "@/types/videoApi";
import { useRouter } from "next/navigation";

const useVideo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const token = Cookies.get("token");
  const postConfig = {
    headers: {
      "content-type": "application/json",
      "x-access-token": token,
    },
  };

  //upload video file or link
  const uploadVideo = async (
    data: FormData
  ): Promise<UploadVideoSuccess | UploadVideoError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<UploadVideoSuccess> = await axios.post(
        UPLOADVIDEO,
        data,
        postConfig
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

  //publish video
  const publish = async (
    data: FormData
  ): Promise<PublishSuccess | PublishError> => {
    setLoading(true);
    try {
      const res: AxiosResponse<PublishSuccess | PublishError> =
        await axios.post(PUBLISHVIDEO, data, postConfig);
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
          return { message: "Something went wrong" };
        }
      }
      return { message: "An unknown error occurred" };
    } finally {
      setLoading(false);
    }
  };

  return { uploadVideo, publish, loading };
};
export default useVideo;
