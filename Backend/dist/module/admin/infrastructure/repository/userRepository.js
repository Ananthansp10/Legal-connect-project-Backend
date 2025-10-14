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
exports.UserRepository = void 0;
const appStatus_1 = require("../../../../common/status/appStatus");
const userSignupModel_1 = require("../../../auth/userAuth/infrastructure/models/userSignupModel");
const baseRepository_1 = require("./baseRepository");
const userProfileModel_1 = require("../../../user/infrastructure/models/userProfileModel");
class UserRepository extends baseRepository_1.BaseRepository {
  constructor() {
    super(userSignupModel_1.userModel);
  }
  updateUserStatus(userId, status) {
    return __awaiter(this, void 0, void 0, function* () {
      if (status == appStatus_1.AppStatus.UNBLOCK) {
        yield userSignupModel_1.userModel.findByIdAndUpdate(userId, {
          $set: { isBlock: false },
        });
      } else {
        yield userSignupModel_1.userModel.findByIdAndUpdate(userId, {
          $set: { isBlock: true },
        });
      }
    });
  }
  searchUser(name) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield userSignupModel_1.userModel.find({
        name: { $regex: new RegExp(name, "i") },
      });
    });
  }
  filterUser(status) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield userSignupModel_1.userModel.find(
        status == "unblock"
          ? { isBlock: false }
          : status == "block"
            ? { isBlock: true }
            : {},
      );
    });
  }
  getUserDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield userProfileModel_1.userProfileModel.findOne({
        userId: userId,
      });
    });
  }
}
exports.UserRepository = UserRepository;
