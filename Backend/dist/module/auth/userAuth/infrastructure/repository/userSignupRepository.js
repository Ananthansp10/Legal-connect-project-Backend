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
exports.UserSignupRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const userSignupModel_1 = require("../models/userSignupModel");
class UserSignupRepository extends baseRepository_1.BaseRepository {
  constructor() {
    super(userSignupModel_1.userModel);
  }
  updateUserToActive(email) {
    return __awaiter(this, void 0, void 0, function* () {
      yield userSignupModel_1.userModel.updateOne(
        { email: email },
        { $set: { isActive: true } },
      );
    });
  }
}
exports.UserSignupRepository = UserSignupRepository;
