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
exports.GetLawyerProfileDataUseCase = void 0;
class GetLawyerProfileDataUseCase {
  constructor(_lawyerRepo) {
    this._lawyerRepo = _lawyerRepo;
  }
  execute(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      const lawyerProfileDetails =
        yield this._lawyerRepo.getLawyerDetails(lawyerId);
      if (!lawyerProfileDetails) {
        return null;
      } else {
        const lawyerProfileDataObj = {
          personalInfo: lawyerProfileDetails.personalInfo,
          professionalInfo: lawyerProfileDetails.proffessionalInfo,
        };
        return lawyerProfileDataObj;
      }
    });
  }
}
exports.GetLawyerProfileDataUseCase = GetLawyerProfileDataUseCase;
