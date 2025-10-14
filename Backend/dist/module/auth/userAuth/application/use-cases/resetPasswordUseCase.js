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
exports.ResetPasswordUseCase = void 0;
const AppEnumError_1 = require("../../../../../common/error/AppEnumError");
const errorException_1 = require("../../../../../common/error/errorException");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppStatusCode_1 = require("../../../../../common/statusCode/AppStatusCode");
class ResetPasswordUseCase {
  constructor(_resetPasswordRepo, _hashService) {
    this._resetPasswordRepo = _resetPasswordRepo;
    this._hashService = _hashService;
  }
  execute(email, oldPassword, newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
      const userExist = yield this._resetPasswordRepo.findByEmail(email);
      if (!userExist) {
        throw new errorException_1.AppException(
          AppEnumError_1.AppError.USER_NOT_FOUND,
          AppStatusCode_1.AppStatusCode.NOT_FOUND,
        );
      }
      const isPasswordMatch = yield bcrypt_1.default.compare(
        oldPassword,
        userExist.password,
      );
      if (!isPasswordMatch) {
        throw new errorException_1.AppException(
          AppEnumError_1.AppError.OLD_PASSWORD_WRONG,
          AppStatusCode_1.AppStatusCode.UNAUTHORIZED,
        );
      }
      const newHashhedPassword = yield this._hashService.hash(newPassword);
      yield this._resetPasswordRepo.changePassword(email, newHashhedPassword);
    });
  }
}
exports.ResetPasswordUseCase = ResetPasswordUseCase;
