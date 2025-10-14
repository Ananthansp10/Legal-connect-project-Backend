"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateOtpService = void 0;
const generateOtp_1 = require("../../../../../utils/generateOtp");
class GenerateOtpService {
  generateOtp() {
    const otpGenerate = new generateOtp_1.GenerateOtp();
    const otp = otpGenerate.generate();
    return otp;
  }
}
exports.GenerateOtpService = GenerateOtpService;
