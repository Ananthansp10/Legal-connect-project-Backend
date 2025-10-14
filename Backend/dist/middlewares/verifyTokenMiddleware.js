"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppStatusCode_1 = require("../common/statusCode/AppStatusCode");
const AppEnumError_1 = require("../common/error/AppEnumError");
const verifyToken = (req, res, next) => {
  var _a, _b;
  try {
    const accessToken =
      (_a = req === null || req === void 0 ? void 0 : req.cookies) === null ||
      _a === void 0
        ? void 0
        : _a.accessToken;
    const refreshToken =
      (_b = req === null || req === void 0 ? void 0 : req.cookies) === null ||
      _b === void 0
        ? void 0
        : _b.refreshToken;
    if (!refreshToken) {
      res
        .status(AppStatusCode_1.AppStatusCode.UNAUTHORIZED)
        .json({ success: false, message: "Token expired", isUnAuth: true });
      return;
    }
    const decodeToken = jsonwebtoken_1.default.decode(accessToken);
    if (
      decodeToken &&
      typeof decodeToken !== "string" &&
      "exp" in decodeToken
    ) {
      const exp = decodeToken.exp;
      if (Date.now() > exp * 1000) {
        try {
          const verifyRefreshToken = jsonwebtoken_1.default.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET,
          );
          const newAccessToken = jsonwebtoken_1.default.sign(
            { id: verifyRefreshToken.id, role: verifyRefreshToken.role },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" },
          );
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60000,
          });
          return next();
        } catch (_error) {
          res.status(AppStatusCode_1.AppStatusCode.UNAUTHORIZED).json({
            success: false,
            message: "Invalid refresh token",
            isUnAuth: true,
          });
          return;
        }
      } else {
        try {
          const verifyAccessToken = jsonwebtoken_1.default.verify(
            accessToken,
            process.env.JWT_ACCESS_TOKEN_SECRET,
          );
          return next();
        } catch (_error) {
          res.status(AppStatusCode_1.AppStatusCode.UNAUTHORIZED).json({
            success: false,
            message: "Invalid access token",
            isUnAuth: true,
          });
          return;
        }
      }
    } else {
      res
        .status(AppStatusCode_1.AppStatusCode.UNAUTHORIZED)
        .json({ success: false, message: "Invalid token", isUnAuth: true });
      return;
    }
  } catch (_error) {
    res
      .status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE)
      .json({ success: false, message: AppEnumError_1.AppError.UNKNOWN_ERROR });
    return;
  }
};
exports.verifyToken = verifyToken;
