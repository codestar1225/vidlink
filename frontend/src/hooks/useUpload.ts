import { UPLOADVIDEO } from "@/utils/constant";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

// Define response types
export type AuthSuccessResponse = {
  message: string;
  token: string;
  stat: number;
};

export type AuthErrorResponse = {
  message: string;
};

const useUpload = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const uploadVideo = async (
    idToken: string | undefined
  ): Promise<AuthSuccessResponse | AuthErrorResponse> => {
    setLoading(true);
    try {
      const res: AxiosResponse<AuthSuccessResponse | AuthErrorResponse> =
        await axios.post(UPLOADVIDEO, { idToken }, config);
      return { ...res.data, stat: res.status };
    } catch (error: unknown) {
      // Type the error to AxiosError and handle the error
      if (axios.isAxiosError(error)) {
        return {
          message: error?.response?.data?.message || "Something went wrong",
        };
      }
      return { message: "An unknown error occurred" };
    } finally {
      setLoading(false);
    }
  };
  return { uploadVideo,loading};
};
export default useUpload;
