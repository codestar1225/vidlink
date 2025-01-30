import { SIGNUP, SIGNIN } from "@/utils/constant";
import axios from "axios";

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
  return { signup, signin };
};
export default useAuth;
