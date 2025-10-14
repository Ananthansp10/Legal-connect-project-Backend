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
exports.LawyerSigninUseCase = void 0;
const AppEnumError_1 = require("../../../../../common/error/AppEnumError");
const errorException_1 = require("../../../../../common/error/errorException");
const AppStatusCode_1 = require("../../../../../common/statusCode/AppStatusCode");
const lawyerSigninMapper_1 = require("../mapper/lawyerSigninMapper");
const bcrypt_1 = __importDefault(require("bcrypt"));
class LawyerSigninUseCase {
  constructor(_lawyerRepo, _tokenGenerateService) {
    this._lawyerRepo = _lawyerRepo;
    this._tokenGenerateService = _tokenGenerateService;
  }
  execute(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
      const lawyerExist = yield this._lawyerRepo.findByEmail(email);
      if (!lawyerExist) {
        throw new errorException_1.AppException(
          AppEnumError_1.AppError.USER_NOT_FOUND,
          AppStatusCode_1.AppStatusCode.NOT_FOUND,
        );
      }
      if (lawyerExist && lawyerExist.isBlock) {
        throw new errorException_1.AppException(
          AppEnumError_1.AppError.ACCOUNT_BLOCKED,
          AppStatusCode_1.AppStatusCode.ACCOUNT_BLOCKED,
        );
      }
      if (lawyerExist && !lawyerExist.verified && !lawyerExist.reason) {
        throw new errorException_1.AppException(
          "Account Not verified",
          AppStatusCode_1.AppStatusCode.UNAVAILABLE,
        );
      }
      if (lawyerExist && lawyerExist.reason && lawyerExist.reason != "null") {
        throw new errorException_1.AppException(
          "Your account has been rejected try again after six month",
        );
      }
      let isPasswordMatch = yield bcrypt_1.default.compare(
        password,
        lawyerExist.password,
      );
      if (!isPasswordMatch) {
        throw new errorException_1.AppException(
          AppEnumError_1.AppError.INVALID_PASSWORD,
          AppStatusCode_1.AppStatusCode.UNAUTHORIZED,
        );
      }
      const accessToken = this._tokenGenerateService.generateAccessToken({
        id: lawyerExist._id,
        role: "lawyer",
      });
      const refreshToken = this._tokenGenerateService.generateRefreshToken({
        id: lawyerExist._id,
        role: "lawyer",
      });
      let response = lawyerSigninMapper_1.LawyerSigninMapper.toResponse(
        lawyerExist,
        accessToken,
        refreshToken,
      );
      return response;
    });
  }
}
exports.LawyerSigninUseCase = LawyerSigninUseCase;
