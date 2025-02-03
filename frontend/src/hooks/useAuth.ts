"use client";
import { SIGNUP, SIGNIN } from "@/utils/constant";
import axios from "axios";
import { useState } from "react";

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //register
  const signup = async (idToken: string | undefined) => {
    setLoading(true);
    try {
      const res: any = await axios.post(SIGNUP, { idToken }, config);
      return res;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  //login
  const signin = async (idToken: string | undefined) => {
    setLoading(true);
    try {
      const res: any = await axios.post(SIGNIN, { idToken: idToken }, config);
      return res;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  return { signup, signin, loading };
};
export default useAuth;
