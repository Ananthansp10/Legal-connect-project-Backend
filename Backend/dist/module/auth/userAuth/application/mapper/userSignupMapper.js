"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignupMapper = void 0;
class UserSignupMapper {
  static toRequest(data) {
    return {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      isActive: false,
      isBlock: false,
    };
  }
  static toResponse(data) {
    return {
      _id: data._id,
      name: data.name,
      email: data.email,
    };
  }
}
exports.UserSignupMapper = UserSignupMapper;
