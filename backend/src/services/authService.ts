import User from "../models/userModel";
import { GoogleTokenPayload } from "../controllers/authController";

export const findUser = async (email: string) => {
  let user = await User.findOne({ email: email });

  return user;
};

// We are only using google sign up and sign in
export const createUser = async (payload: GoogleTokenPayload) => {
  const user = new User({
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  });
  console.log(user)
  await user.save();

  return user;
};

export default { findUser, createUser };
