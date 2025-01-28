import { REGISTER } from "@/constant/api";
import axios from "axios";

const useAuth = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //register
  const register = async (idToken: string | undefined) => {
    try {
      const { data } = await axios.post(REGISTER, { idToken: idToken }, config);
      return data;
    } catch (error) {
      return error;
    }
  };
  //login

  const login = async (idToken: string | undefined) => {
    try {
      const { data } = await axios.post(REGISTER, { idToken: idToken }, config);
      return data;
    } catch (error) {
      return error;
    }
  };
  return { register, login };
};
export default useAuth;
