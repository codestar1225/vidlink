import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import authService from "../services/authService";
import User from "../models/userModel";

export type GoogleTokenPayload = {
  email: string;
  name: string;
  picture: string;
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const register = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload() as GoogleTokenPayload;

    if (!payload || !payload.email) {
      throw new Error("Invalid token payload");
    }

    const user = await authService.findUser(payload.email);
    if (user)
      res
        .status(400)
        .json({ message: "User already registered, please login" });
    else {
      const user = await authService.createUser(payload);
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "0.01h" }
      );
      res.status(201).json({
        message: "User created",
        token,
        user: { userName: user.userName, picture: user.picture },
      });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    console.log("error", error.message);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload() as GoogleTokenPayload;

    if (!payload || !payload.email) {
      throw new Error("Invalid token payload");
    }

    const user = await authService.findUser(payload.email);
    if (user) {
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "0.01h" }
      );
      const userInfo = await User.findOne({ email: payload.email })
        .select("userName picture")
        .lean();
      res
        .status(201)
        .json({ message: "User Logged In", token, user: userInfo });
    } else
      res
        .status(400)
        .json({ message: "User doesn't exist, please sign up firstly" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default { register, login };
