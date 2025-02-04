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
exports.createUser = exports.findUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const findUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield userModel_1.default.findOne({ email: email });
    return user;
});
exports.findUser = findUser;
// We are only using google sign up and sign in
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new userModel_1.default({
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
    });
    yield user.save();
    return user;
});
exports.createUser = createUser;
exports.default = { findUser: exports.findUser, createUser: exports.createUser };
