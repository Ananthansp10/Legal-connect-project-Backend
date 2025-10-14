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
exports.UserSigninUseCase = void 0;
const AppEnumError_1 = require("../../../../../common/error/AppEnumError");
const errorException_1 = require("../../../../../common/error/errorException");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSigninMapper_1 = require("../mapper/userSigninMapper");
const AppStatusCode_1 = require("../../../../../common/statusCode/AppStatusCode");
class UserSigninUseCase {
  constructor(_userSigninRepo, _tokenGenerationService) {
    this._userSigninRepo = _userSigninRepo;
    this._tokenGenerationService = _tokenGenerationService;
  }
  execute(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
      const userExist = yield this._userSigninRepo.findByEmail(email);
      if (!userExist) {
        throw new errorException_1.AppException(
          AppEnumError_1.AppError.USER_NOT_FOUND,
          AppStatusCode_1.AppStatusCode.NOT_FOUND,
        );
      }
      if (userExist.isBlock) {
        throw new errorException_1.AppException(
          AppEnumError_1.AppError.ACCOUNT_BLOCKED,
          AppStatusCode_1.AppStatusCode.ACCOUNT_BLOCKED,
        );
      }
      const isPasswordMatch = yield bcrypt_1.default.compare(
        password,
        userExist.password,
      );
      if (!isPasswordMatch) {
        throw new errorException_1.AppException(
          AppEnumError_1.AppError.INVALID_PASSWORD,
          AppStatusCode_1.AppStatusCode.UNAUTHORIZED,
        );
      }
      const accessToken = this._tokenGenerationService.generateAccessToken({
        id: userExist._id,
        role: "user",
      });
      const refreshToken = this._tokenGenerationService.generateRefreshToken({
        id: userExist._id,
        role: "user",
      });
      const response = userSigninMapper_1.UserSigninMapper.toResponse(
        userExist,
        accessToken,
        refreshToken,
      );
      return response;
    });
  }
}
exports.UserSigninUseCase = UserSigninUseCase;
