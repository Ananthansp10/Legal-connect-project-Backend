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
exports.LawyerAddProfileUseCase = void 0;
const lawyerProfileMapper_1 = require("../mapper/lawyerProfileMapper");
class LawyerAddProfileUseCase {
  constructor(_lawyerAddProfileRepo) {
    this._lawyerAddProfileRepo = _lawyerAddProfileRepo;
  }
  execute(data, imageUrls) {
    return __awaiter(this, void 0, void 0, function* () {
      const lawyerProfileData =
        yield lawyerProfileMapper_1.LawyerProfileMapper.toRequest(
          data,
          imageUrls,
        );
      return yield this._lawyerAddProfileRepo.create(lawyerProfileData);
    });
  }
}
exports.LawyerAddProfileUseCase = LawyerAddProfileUseCase;
