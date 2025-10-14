"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieTokenService = void 0;
class CookieTokenService {
  setAuthCookie(res, accessToken, refreshToken) {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60000,
    });
  }
}
exports.CookieTokenService = CookieTokenService;
