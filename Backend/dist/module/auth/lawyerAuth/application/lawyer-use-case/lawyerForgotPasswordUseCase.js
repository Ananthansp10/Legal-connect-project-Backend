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
exports.LawyerForgotPasswordUseCase = void 0;
const AppEnumError_1 = require("../../../../../common/error/AppEnumError");
const errorException_1 = require("../../../../../common/error/errorException");
const AppStatusCode_1 = require("../../../../../common/statusCode/AppStatusCode");
class LawyerForgotPasswordUseCase {
  constructor(_emailService, _ForgotPasswordTokenGenerate, _lawyerRepo) {
    this._emailService = _emailService;
    this._ForgotPasswordTokenGenerate = _ForgotPasswordTokenGenerate;
    this._lawyerRepo = _lawyerRepo;
  }
  execute(email) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const lawyer = yield this._lawyerRepo.findByEmail(email);
        if (!lawyer) {
          throw new errorException_1.AppException(
            AppEnumError_1.AppError.USER_NOT_FOUND,
            AppStatusCode_1.AppStatusCode.NOT_FOUND,
          );
        }
        const token =
          yield this._ForgotPasswordTokenGenerate.generateForgotPasswordToken({
            email: email,
          });
        this._emailService.sendForgotPasswordEMail(email, lawyer.name, token);
      } catch (error) {
        throw error;
      }
    });
  }
}
exports.LawyerForgotPasswordUseCase = LawyerForgotPasswordUseCase;
