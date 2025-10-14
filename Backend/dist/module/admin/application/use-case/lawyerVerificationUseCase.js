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
exports.LawyerVerificationUseCase = void 0;
const appStatus_1 = require("../../../../common/status/appStatus");
class LawyerVerificationUseCase {
  constructor(_lawyerVerificationRepo, _lawyerVerifyEmailService) {
    this._lawyerVerificationRepo = _lawyerVerificationRepo;
    this._lawyerVerifyEmailService = _lawyerVerifyEmailService;
  }
  execute(lawyerId, status, reason) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a, _b;
      const lawyer = yield this._lawyerVerificationRepo.findById(lawyerId);
      this._lawyerVerifyEmailService.sendVerificationEmail(
        (_a = lawyer === null || lawyer === void 0 ? void 0 : lawyer.email) !==
          null && _a !== void 0
          ? _a
          : "",
        (_b = lawyer === null || lawyer === void 0 ? void 0 : lawyer.name) !==
          null && _b !== void 0
          ? _b
          : "",
        status,
        reason,
      );
      if (status == appStatus_1.AppStatus.APPROVE) {
        yield this._lawyerVerificationRepo.updateLawyerVerification(
          lawyerId,
          true,
          reason,
        );
        return true;
      } else {
        yield this._lawyerVerificationRepo.updateLawyerVerification(
          lawyerId,
          false,
          reason,
        );
        return false;
      }
    });
  }
}
exports.LawyerVerificationUseCase = LawyerVerificationUseCase;
