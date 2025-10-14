"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LawyerSigninMapper = void 0;
class LawyerSigninMapper {
  static toResponse(data, accessToken, refreshToken) {
    return {
      lawyerDetails: {
        _id: data._id,
        name: data.name,
        email: data.email,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
exports.LawyerSigninMapper = LawyerSigninMapper;
