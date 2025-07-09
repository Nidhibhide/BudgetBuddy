import User from "../models/user";
import nodemailer from "nodemailer";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { JsonOne } from "../utils/responseFun";
import { Request, RequestHandler, Response } from "express";
import {
  mailOptionsForVResetPass,
  transporterFun,
} from "../utils/sendEmailFun";
import { accessTokenOptions } from "../utils/cookieOptions";
import expireTime from "../utils/expireTimeFun";

const verifyCurrentPassword = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return JsonOne(res, 404, "User not found", false);
    }
    if (!user.password) {
      return JsonOne(res, 404, "Old password not found", false);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return JsonOne(res, 401, "Incorrect password", false);
    }

    return JsonOne(res, 200, "Password Match Found", true);
  } catch (error) {
    JsonOne(
      res,
      500,
      "unexpected error occurred while verify current password",
      false
    );
  }
};

const checkToken = async (req: Request, res: Response) => {
  const token = req.cookies.access_token;

  if (!token) {
    return JsonOne(res, 404, "Token not found", false);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;

    return JsonOne(res, 200, "Token valid", true);
  } catch (err) {
    return JsonOne(res, 500, "Token expired or invalid", false);
  }
};
const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refresh_token;

  if (!token) {
    return JsonOne(res, 404, "Token not found", false);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN as string
    ) as JwtPayload;

    const jwtToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN as string,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("access_token", jwtToken, accessTokenOptions);

    return JsonOne(res, 200, "Token refreshed successfully", true);
  } catch (err) {
    return JsonOne(res, 500, "Refresh Token expired or invalid", false);
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return JsonOne(res, 404, "User not found", false);
    }

    const hashedPass = await bcrypt.hash(password, 10);
    user.password = hashedPass;

    await user.save();

    return JsonOne(res, 200, "Password reset successfully", true);
  } catch (error) {
    console.error("Error resetting password:", error);
    return JsonOne(res, 500, "Server error", false);
  }
};
export { changePassword, checkToken, verifyCurrentPassword, refreshToken };
