import { SIGNUP, SIGNIN } from "@/utils/constant";
import axios from "axios";
import { jwtVerify } from "jose";
import Cookies from "js-cookie";

const useAuth = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //register
  const signup = async (idToken: string | undefined) => {
    try {
      const res: any = await axios.post(SIGNUP, { idToken }, config);
      return res;
    } catch (error) {
      return error;
    }
  };

  //login
  const signin = async (idToken: string | undefined) => {
    try {
      const res: any = await axios.post(SIGNIN, { idToken: idToken }, config);
      return res;
    } catch (error) {
      return error;
    }
  };

  //auth
  const verifyToken = async () => {
    const token =  Cookies.get("token") as string;
    if (!token || typeof token !== "string") {
      return false;
    }
    const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET as string;
    if (!jwtSecret || typeof jwtSecret !== "string") {
      return false;
    }
    try {
      await jwtVerify(token, new TextEncoder().encode(jwtSecret));
      return true;
    } catch (error) {
      return false;
    }
  };
  return { signup, signin, verifyToken };
};
export default useAuth;
