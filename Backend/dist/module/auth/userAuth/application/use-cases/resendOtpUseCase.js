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
exports.ResendOtpUseCase = void 0;
class ResendOtpUseCase {
  constructor(
    _otpService,
    _generateOtpService,
    _hashService,
    _sendEmailService,
  ) {
    this._otpService = _otpService;
    this._generateOtpService = _generateOtpService;
    this._hashService = _hashService;
    this._sendEmailService = _sendEmailService;
  }
  resendOtp(email) {
    return __awaiter(this, void 0, void 0, function* () {
      const otp = this._generateOtpService.generateOtp();
      const hashedOtp = yield this._hashService.hash(otp);
      yield this._otpService.saveOtp(email, hashedOtp);
      this._sendEmailService.sendOtpMail(email, otp);
      setTimeout(() => {
        this._otpService.deleteOtp(email);
      }, 60000 * 2);
    });
  }
}
exports.ResendOtpUseCase = ResendOtpUseCase;
