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
exports.AdminSigninUseCase = void 0;
const AppEnumError_1 = require("../../../../../common/error/AppEnumError");
const errorException_1 = require("../../../../../common/error/errorException");
const AppStatusCode_1 = require("../../../../../common/statusCode/AppStatusCode");
class AdminSigninUseCase {
  constructor(_tokenGenerateService) {
    this._tokenGenerateService = _tokenGenerateService;
  }
  execute(data) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (data.email != process.env.ADMIN_EMAIL) {
          throw new errorException_1.AppException(
            AppEnumError_1.AppError.INVALID_EMAIL,
            AppStatusCode_1.AppStatusCode.UNAUTHORIZED,
          );
        }
        if (data.password != process.env.ADMIN_PASSWORD) {
          throw new errorException_1.AppException(
            AppEnumError_1.AppError.INVALID_PASSWORD,
            AppStatusCode_1.AppStatusCode.UNAUTHORIZED,
          );
        }
        const accessToken = this._tokenGenerateService.generateAccessToken({
          id: "admin",
          role: "admin",
        });
        const refreshToken = this._tokenGenerateService.generateRefreshToken({
          id: "admin",
          role: "admin",
        });
        return { accessToken, refreshToken };
      } catch (error) {
        throw error;
      }
    });
  }
}
exports.AdminSigninUseCase = AdminSigninUseCase;
