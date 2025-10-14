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
exports.LawyerSignupUseCase = void 0;
const AppEnumError_1 = require("../../../../../common/error/AppEnumError");
const errorException_1 = require("../../../../../common/error/errorException");
const AppStatusCode_1 = require("../../../../../common/statusCode/AppStatusCode");
const lawyerSignupMapper_1 = require("../mapper/lawyerSignupMapper");
class LawyerSignupUseCase {
  constructor(_lawyerRepo, _hashService) {
    this._lawyerRepo = _lawyerRepo;
    this._hashService = _hashService;
  }
  registerLawyer(data) {
    return __awaiter(this, void 0, void 0, function* () {
      const emailExist = yield this._lawyerRepo.findByEmail(data.email);
      if (emailExist && emailExist.verified) {
        throw new errorException_1.AppException(
          AppEnumError_1.AppError.USER_ALREADY_EXISTS,
          AppStatusCode_1.AppStatusCode.CONFLICT,
        );
      }
      if (emailExist && emailExist.reason) {
        const currentDate = new Date();
        let sixMonthLater = new Date(emailExist.createdAt);
        sixMonthLater.setMonth(sixMonthLater.getMonth() + 6);
        if (
          currentDate.getDay() == sixMonthLater.getDay() &&
          currentDate.getMonth() == sixMonthLater.getMonth()
        ) {
          yield this._lawyerRepo.deleteByEmail(emailExist.email);
          yield this._lawyerRepo.create(data);
        } else {
          throw new errorException_1.AppException(
            "Your Account has been rejected please try again after six month",
            AppStatusCode_1.AppStatusCode.ACCOUNT_BLOCKED,
          );
        }
      }
      const hashedPassword = yield this._hashService.hash(data.password);
      const lawyerObj = lawyerSignupMapper_1.LawyerSignupMapper.toRequest(
        Object.assign(Object.assign({}, data), { password: hashedPassword }),
      );
      const dbResponse = yield this._lawyerRepo.create(lawyerObj);
      const response =
        lawyerSignupMapper_1.LawyerSignupMapper.toResponse(dbResponse);
      return response;
    });
  }
}
exports.LawyerSignupUseCase = LawyerSignupUseCase;
