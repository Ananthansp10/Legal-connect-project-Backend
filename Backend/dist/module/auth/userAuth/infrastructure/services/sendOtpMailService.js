"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOtpMailService = void 0;
const nodemailerConfig_1 = require("../../../../../config/nodemailerConfig");
class SendOtpMailService {
  sendOtpMail(to, otp) {
    return __awaiter(this, void 0, void 0, function* () {
      const mailOptions = {
        from: `"LegalConnect" <${process.env.EMAIL}>`,
        to,
        subject: "Your OTP Code",
        html: `
        <div style="font-family:sans-serif;">
            <h2>Welcome to LegalConnect</h2>
            <p>Your OTP code is:</p>
            <h1 style="color:#3b82f6;">${otp}</h1>
            <p>This OTP will expire in 1 minutes.</p>
        </div>
        `,
      };
      yield nodemailerConfig_1.transporter.sendMail(mailOptions);
    });
  }
}
exports.SendOtpMailService = SendOtpMailService;
