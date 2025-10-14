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
exports.LawyerResetPasswordUseCase = void 0;
const AppEnumError_1 = require("../../../../../common/error/AppEnumError");
const errorException_1 = require("../../../../../common/error/errorException");
const AppStatusCode_1 = require("../../../../../common/statusCode/AppStatusCode");
const bcrypt_1 = __importDefault(require("bcrypt"));
class LawyerResetPasswordUseCase {
  constructor(_changePasswordRepo, _hashPasswordService) {
    this._changePasswordRepo = _changePasswordRepo;
    this._hashPasswordService = _hashPasswordService;
  }
  resetPassword(email, oldPassword, newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
      const emailExist = yield this._changePasswordRepo.findByEmail(email);
      if (!emailExist) {
        throw new errorException_1.AppException(
          AppEnumError_1.AppError.USER_NOT_FOUND,
          AppStatusCode_1.AppStatusCode.NOT_FOUND,
        );
      }
      const isPasswordMatch = yield bcrypt_1.default.compare(
        oldPassword,
        emailExist.password,
      );
      if (!isPasswordMatch) {
        throw new errorException_1.AppException(
          AppEnumError_1.AppError.OLD_PASSWORD_WRONG,
          AppStatusCode_1.AppStatusCode.UNAUTHORIZED,
        );
      }
      const hashedPassword = yield this._hashPasswordService.hash(newPassword);
      yield this._changePasswordRepo.changePassword(email, hashedPassword);
    });
  }
}
exports.LawyerResetPasswordUseCase = LawyerResetPasswordUseCase;
