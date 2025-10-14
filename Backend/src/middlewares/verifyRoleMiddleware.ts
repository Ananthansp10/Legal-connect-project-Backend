import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppStatusCode } from "../common/statusCode/AppStatusCode";

interface IJwtPayload {
  id: string;
  email: string;
  role: string;
}

export const verifyRole = ([...role]: string[]) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.accessToken;
    const decodeToken = jwt.decode(token) as IJwtPayload;

    if (!role.includes(decodeToken.role)) {
      res
        .status(AppStatusCode.ACCOUNT_BLOCKED)
        .json({ success: false, message: "Access Denied", isUnAuth: true });
      return;
    }
    return next();
  };
};
