"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSigninMapper = void 0;
class UserSigninMapper {
  static toResponse(data, accessToken, refreshToken) {
    return {
      userData: {
        id: data._id,
        name: data.name,
        email: data.email,
        googleId: data === null || data === void 0 ? void 0 : data.googleId,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
exports.UserSigninMapper = UserSigninMapper;
