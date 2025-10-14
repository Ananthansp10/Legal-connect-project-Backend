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
exports.GoogleAuthUseCase = void 0;
const userSigninMapper_1 = require("../mapper/userSigninMapper");
const errorException_1 = require("../../../../../common/error/errorException");
const AppEnumError_1 = require("../../../../../common/error/AppEnumError");
const AppStatusCode_1 = require("../../../../../common/statusCode/AppStatusCode");
class GoogleAuthUseCase {
  constructor(_googleAuthRepo, _tokenGenerateService) {
    this._googleAuthRepo = _googleAuthRepo;
    this._tokenGenerateService = _tokenGenerateService;
  }
  execute(data) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const userExist = yield this._googleAuthRepo.findByEmail(data.email);
        if (
          userExist === null || userExist === void 0
            ? void 0
            : userExist.isBlock
        ) {
          throw new errorException_1.AppException(
            AppEnumError_1.AppError.ACCOUNT_BLOCKED,
            AppStatusCode_1.AppStatusCode.ACCOUNT_BLOCKED,
          );
        }
        if (userExist && !userExist.googleId) {
          throw new errorException_1.AppException(
            AppEnumError_1.AppError.USER_ALREADY_EXISTS,
            AppStatusCode_1.AppStatusCode.CONFLICT,
          );
        }
        if (!userExist) {
          let userObj = {
            name: data.name,
            email: data.email,
            googleId: data.googleId,
            isActive: true,
            isBlock: false,
          };
          const user = yield this._googleAuthRepo.create(userObj);
          const accessToken = this._tokenGenerateService.generateAccessToken({
            id: user === null || user === void 0 ? void 0 : user._id,
            role: "user",
          });
          const refreshToken = this._tokenGenerateService.generateRefreshToken({
            id: user,
            role: "user",
          });
          const response = userSigninMapper_1.UserSigninMapper.toResponse(
            user,
            accessToken,
            refreshToken,
          );
          return response;
        }
        const accessToken = this._tokenGenerateService.generateAccessToken({
          id: userExist._id,
          role: "user",
        });
        const refreshToken = this._tokenGenerateService.generateRefreshToken({
          id: userExist._id,
          role: "user",
        });
        const response = userSigninMapper_1.UserSigninMapper.toResponse(
          userExist,
          accessToken,
          refreshToken,
        );
        return response;
      } catch (error) {
        throw error;
      }
    });
  }
}
exports.GoogleAuthUseCase = GoogleAuthUseCase;
