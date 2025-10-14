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
exports.GetLawyerChatProfileUseCase = void 0;
class GetLawyerChatProfileUseCase {
  constructor(_chatRepo) {
    this._chatRepo = _chatRepo;
  }
  execute(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a, _b, _c, _d;
      const lawyerDetails = yield this._chatRepo.findLawyerDetails(lawyerId);
      return {
        name:
          (_a =
            lawyerDetails === null || lawyerDetails === void 0
              ? void 0
              : lawyerDetails.personalInfo.name) !== null && _a !== void 0
            ? _a
            : "",
        profileImage:
          (_b =
            lawyerDetails === null || lawyerDetails === void 0
              ? void 0
              : lawyerDetails.personalInfo.profileImage) !== null &&
          _b !== void 0
            ? _b
            : "",
        specialization:
          (_c =
            lawyerDetails === null || lawyerDetails === void 0
              ? void 0
              : lawyerDetails.proffessionalInfo.practiceAreas[0]) !== null &&
          _c !== void 0
            ? _c
            : "",
        courtName:
          (_d =
            lawyerDetails === null || lawyerDetails === void 0
              ? void 0
              : lawyerDetails.proffessionalInfo.courtName) !== null &&
          _d !== void 0
            ? _d
            : "",
      };
    });
  }
}
exports.GetLawyerChatProfileUseCase = GetLawyerChatProfileUseCase;
