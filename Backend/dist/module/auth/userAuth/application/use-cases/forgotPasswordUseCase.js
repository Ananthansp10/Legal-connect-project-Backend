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
exports.ForgotPasswordUseCase = void 0;
class ForgotPasswordUseCase {
  constructor(_otpRepo, _otpGenerateService, _hashService, _emailService) {
    this._otpRepo = _otpRepo;
    this._otpGenerateService = _otpGenerateService;
    this._hashService = _hashService;
    this._emailService = _emailService;
  }
  execute(email) {
    return __awaiter(this, void 0, void 0, function* () {
      const otp = this._otpGenerateService.generateOtp();
      const hashedOtp = yield this._hashService.hash(otp);
      yield this._otpRepo.saveOtp(email, hashedOtp);
      this._emailService.sendOtpMail(email, otp);
      setTimeout(() => {
        this._otpRepo.deleteOtp(email);
      }, 60000 * 2);
      return { email: email };
    });
  }
}
exports.ForgotPasswordUseCase = ForgotPasswordUseCase;
