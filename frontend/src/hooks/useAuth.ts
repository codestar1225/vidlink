"use client";
import { SIGNUP, SIGNIN } from "@/utils/constant";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

// Define response types
export type AuthSuccessResponse = {
  message: string;
  token: string;
};

export type AuthErrorResponse = {
  message: string;
};

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // register
  const signup = async (idToken: string | undefined): Promise<AuthSuccessResponse | AuthErrorResponse> => {
    setLoading(true);
    try {
      const res: AxiosResponse<AuthSuccessResponse | AuthErrorResponse> = await axios.post(SIGNUP, { idToken }, config);
      return res.data; // Return the response data
    } catch (error: any) {
      // Handle error (returning a generic error message)
      return { message: error?.response?.data?.message || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  // login
  const signin = async (idToken: string | undefined): Promise<AuthSuccessResponse | AuthErrorResponse> => {
    setLoading(true);
    try {
      const res: AxiosResponse<AuthSuccessResponse | AuthErrorResponse> = await axios.post(SIGNIN, { idToken: idToken }, config);
      return res.data; // Return the response data
    } catch (error: any) {
      // Handle error (returning a generic error message)
      return { message: error?.response?.data?.message || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  return { signup, signin, loading };
};

export default useAuth;
