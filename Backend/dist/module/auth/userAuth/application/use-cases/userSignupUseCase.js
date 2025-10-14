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
exports.UserSignupUseCase = void 0;
const AppEnumError_1 = require("../../../../../common/error/AppEnumError");
const errorException_1 = require("../../../../../common/error/errorException");
const userSignupMapper_1 = require("../mapper/userSignupMapper");
const AppStatusCode_1 = require("../../../../../common/statusCode/AppStatusCode");
class UserSignupUseCase {
  constructor(
    userRepo,
    otpEmailService,
    generateOtpSrvice,
    hashService,
    otpService,
  ) {
    this._userRepo = userRepo;
    this._sendEmail = otpEmailService;
    this._generateOtp = generateOtpSrvice;
    this._hashPassword = hashService;
    this._otpAction = otpService;
    this._hashOtp = hashService;
  }
  registerUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const userExist = yield this._userRepo.findByEmail(data.email);
        if (userExist) {
          throw new errorException_1.AppException(
            AppEnumError_1.AppError.USER_ALREADY_EXISTS,
            AppStatusCode_1.AppStatusCode.CONFLICT,
          );
        } else {
          const user = userSignupMapper_1.UserSignupMapper.toRequest(data);
          const otp = this._generateOtp.generateOtp();
          const hashedPassword = yield this._hashPassword.hash(user.password);
          const hashedOtp = yield this._hashOtp.hash(otp);
          yield this._otpAction.saveOtp(user.email, hashedOtp);
          this._sendEmail.sendOtpMail(user.email, otp);
          setTimeout(() => {
            this._otpAction.deleteOtp(user.email);
          }, 60000 * 2);
          const newUser = Object.assign(Object.assign({}, user), {
            password: hashedPassword,
          });
          const userObj = yield this._userRepo.create(newUser);
          return userSignupMapper_1.UserSignupMapper.toResponse(userObj);
        }
      } catch (error) {
        throw error;
      }
    });
  }
}
exports.UserSignupUseCase = UserSignupUseCase;
