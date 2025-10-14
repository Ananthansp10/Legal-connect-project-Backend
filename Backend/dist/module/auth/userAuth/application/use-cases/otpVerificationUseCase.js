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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpVerificationUseCase = void 0;
const AppEnumError_1 = require("../../../../../common/error/AppEnumError");
const errorException_1 = require("../../../../../common/error/errorException");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppStatusCode_1 = require("../../../../../common/statusCode/AppStatusCode");
class OtpVerificationUseCase {
  constructor(otpVerificationRepo, userRepo) {
    this._otpVerificationRepo = otpVerificationRepo;
    this._userRepo = userRepo;
  }
  verifyOtp(email, otp) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const isOtpExist =
          yield this._otpVerificationRepo.findOtpByEmail(email);
        if (!isOtpExist) {
          throw new errorException_1.AppException(
            AppEnumError_1.AppError.OTP_EXPIRED,
            AppStatusCode_1.AppStatusCode.BAD_REQUEST_CODE,
          );
        } else {
          const isOtpMatch = yield bcrypt_1.default.compare(
            otp,
            isOtpExist.otp,
          );
          if (!isOtpMatch) {
            throw new errorException_1.AppException(
              AppEnumError_1.AppError.INVALID_OTP,
              AppStatusCode_1.AppStatusCode.BAD_REQUEST_CODE,
            );
          } else {
            yield this._userRepo.updateUserToActive(email);
            return true;
          }
        }
      } catch (error) {
        throw error;
      }
    });
  }
}
exports.OtpVerificationUseCase = OtpVerificationUseCase;
