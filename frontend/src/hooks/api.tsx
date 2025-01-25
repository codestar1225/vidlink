import { REGISTER } from "@/constant/api";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
interface Session {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const register = async (session: Session | undefined) => {
  try {
    const { data } = await axios.post(REGISTER, session, config);
    return data;
  } catch (error) {
    return error;
  }
};
export { register };
