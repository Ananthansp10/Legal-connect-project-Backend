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
exports.ForgotPasswordEmailService = void 0;
const nodemailerConfig_1 = require("../../../../../config/nodemailerConfig");
class ForgotPasswordEmailService {
  sendForgotPasswordEMail(toEmail, userName, token) {
    return __awaiter(this, void 0, void 0, function* () {
      const resetLink = `http://localhost:5173/auth/lawyer/forgotpassword?email=${encodeURIComponent(toEmail)}&token=${encodeURIComponent(token)}`;
      const mailOptions = {
        from: "Legal Platform",
        to: toEmail,
        subject: "Password Reset Request",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f8fafc; padding: 30px; border-radius: 10px;">
            <h2 style="color: #334155;">Hello ${userName},</h2>
            <p style="color: #64748b;">
            We received a request to reset your password for your Legal Platform account.
            </p>
            <p style="color: #64748b;">
            Click the button below to reset your password. If you did not request a password reset, you can safely ignore this email.
            </p>
            <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 8px;">
                Reset Password
            </a>
            </div>
            <p style="font-size: 12px; color: #64748b;">
            This link will expire in 15 minutes.
            </p>
            <p style="color: #64748b;">Regards,<br/>Legal Platform Team</p>
        </div>
        `,
      };
      try {
        yield nodemailerConfig_1.transporter.sendMail(mailOptions);
        console.log("Forgot password email sent to", toEmail);
      } catch (error) {
        console.error("Error sending forgot password email:", error);
      }
    });
  }
}
exports.ForgotPasswordEmailService = ForgotPasswordEmailService;
