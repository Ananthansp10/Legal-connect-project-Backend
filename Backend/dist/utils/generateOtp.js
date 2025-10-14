"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateOtp = void 0;
class GenerateOtp {
  generate() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }
}
exports.GenerateOtp = GenerateOtp;
