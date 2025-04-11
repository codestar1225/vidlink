"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authService_1 = __importDefault(require("../services/authService"));
const userModel_1 = __importDefault(require("../models/userModel"));
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// const register = async (req: Request, res: Response) => {
//   try {
//     const { idToken } = req.body;
//     const ticket = await client.verifyIdToken({
//       idToken: idToken,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload() as GoogleTokenPayload;
//     if (!payload || !payload.email) {
//       throw new Error("Invalid token payload");
//     }
//     const user = await authService.findUser(payload.email);
//     if (user)
//       res
//         .status(400)
//         .json({ message: "User already registered, please login" });
//     else {
//       const user = await authService.createUser(payload);
//       const token = jwt.sign(
//         { userId: user._id },
//         process.env.JWT_SECRET as string,
//         { expiresIn: "4h" }
//       );
//       res.status(201).json({
//         message: "User created",
//         token,
//         user: { userName: user.userName, picture: user.picture },
//       });
//     }
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//     console.log("error", error.message);
//   }
// };
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idToken } = req.body;
        const ticket = yield client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            throw new Error("Invalid token payload");
        }
        const user = yield authService_1.default.findUser(payload.email);
        if (user) {
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "4h" });
            const userInfo = yield userModel_1.default.findOne({ email: payload.email })
                .select("userName picture")
                .lean();
            res
                .status(201)
                .json({ message: "Logged in successfully.", token, user: userInfo });
        }
        else {
            const user = yield authService_1.default.createUser(payload);
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "4h" });
            res.status(201).json({
                message: "Signed up successfully.",
                token,
                user: { userName: user.userName, picture: user.picture },
            });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.default = { login };
