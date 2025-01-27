import { REGISTER } from "@/constant/api";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
interface Session {
  user?: User | null;
  expires?: string | null;
  accessToken?: string | null;
}

const register = async (session: Session | null) => {
  try {
    const { data } = await axios.post(REGISTER, session, config);
    return data;
  } catch (error) {
    return error;
  }
};
export { register };
