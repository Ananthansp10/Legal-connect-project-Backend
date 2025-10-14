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
exports.LawyerVerificationEmail = void 0;
const nodemailerConfig_1 = require("../../../../config/nodemailerConfig");
class LawyerVerificationEmail {
  sendVerificationEmail(to, name, status, reason) {
    return __awaiter(this, void 0, void 0, function* () {
      let subject = "";
      let html = "";
      if (status === "approve") {
        subject = "Your Lawyer Profile Has Been Approved";
        html = `
            <h3>Hello ${name},</h3>
            <p>Congratulations! Your lawyer profile has been <strong>approved</strong>.</p>
            <p>You can now log in and start using your account.</p>
            <br/>
            <p>Regards,<br/>Legal Consultation Team</p>
            `;
      } else {
        subject = "Your Lawyer Profile Has Been Rejected";
        html = `
            <h3>Hello ${name},</h3>
            <p>We regret to inform you that your lawyer profile has been <strong>rejected</strong>.</p>
            ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
            <p>Your account has rejected for six month after six month re-register your account</p>
            <br/>
            <p>Regards,<br/>Legal Consultation Team</p>
            `;
      }
      try {
        yield nodemailerConfig_1.transporter.sendMail({
          from: "Legal Platform",
          to: to,
          subject,
          html,
        });
        console.log(`${status} email sent to ${to}`);
      } catch (err) {
        console.error("Failed to send email:", err);
      }
    });
  }
}
exports.LawyerVerificationEmail = LawyerVerificationEmail;
