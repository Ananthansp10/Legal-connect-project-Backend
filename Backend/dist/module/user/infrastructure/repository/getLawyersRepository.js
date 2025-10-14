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
exports.GetLawyerRepository = void 0;
const lawyerProfileModel_1 = require("../../../lawyer/infrastructure/models/lawyerProfileModel");
const baseRepository_1 = require("./baseRepository");
class GetLawyerRepository extends baseRepository_1.BaseRepository {
  constructor() {
    super(lawyerProfileModel_1.lawyerProfileModel);
  }
  getLawyers() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield lawyerProfileModel_1.lawyerProfileModel.find();
    });
  }
  getLawyerById(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield lawyerProfileModel_1.lawyerProfileModel.findOne({
        lawyerId: lawyerId,
      });
    });
  }
  getLawyerBySpecialization(specialization) {
    return __awaiter(this, void 0, void 0, function* () {
      if (specialization == "All Specializations") {
        return yield lawyerProfileModel_1.lawyerProfileModel.find();
      } else {
        return yield lawyerProfileModel_1.lawyerProfileModel.find({
          "proffessionalInfo.practiceAreas": { $in: [specialization] },
        });
      }
    });
  }
  getLawyerByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield lawyerProfileModel_1.lawyerProfileModel.find({
        "personalInfo.name": { $regex: new RegExp(`^${name}$`, "i") },
      });
    });
  }
}
exports.GetLawyerRepository = GetLawyerRepository;
