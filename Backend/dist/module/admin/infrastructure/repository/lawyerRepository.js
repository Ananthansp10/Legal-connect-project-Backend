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
exports.LawyerRepository = void 0;
const appStatus_1 = require("../../../../common/status/appStatus");
const lawyerModel_1 = require("../../../auth/lawyerAuth/infrastructure/models/lawyerModel");
const lawyerProfileModel_1 = require("../../../lawyer/infrastructure/models/lawyerProfileModel");
const baseRepository_1 = require("./baseRepository");
class LawyerRepository extends baseRepository_1.BaseRepository {
  constructor() {
    super(lawyerModel_1.lawyerModel);
  }
  updateLawyerStatus(lawyerId, status) {
    return __awaiter(this, void 0, void 0, function* () {
      if (status == appStatus_1.AppStatus.UNBLOCK) {
        yield lawyerModel_1.lawyerModel.findByIdAndUpdate(lawyerId, {
          $set: { isBlock: false },
        });
      } else {
        yield lawyerModel_1.lawyerModel.findByIdAndUpdate(lawyerId, {
          $set: { isBlock: true },
        });
      }
    });
  }
  searchLawyer(name) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield lawyerModel_1.lawyerModel.find({ name: name });
    });
  }
  filterLawyer(status) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield lawyerModel_1.lawyerModel.find(
        status == "unblock"
          ? { isBlock: false }
          : status == "block"
            ? { isBlock: true }
            : {},
      );
    });
  }
  getLawyerDetails(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield lawyerProfileModel_1.lawyerProfileModel.findOne({
        lawyerId: lawyerId,
      });
    });
  }
}
exports.LawyerRepository = LawyerRepository;
