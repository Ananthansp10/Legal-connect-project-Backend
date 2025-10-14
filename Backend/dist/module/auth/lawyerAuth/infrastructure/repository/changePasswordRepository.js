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
exports.ChangePasswordRepository = void 0;
const lawyerModel_1 = require("../models/lawyerModel");
const baseRepository_1 = require("./baseRepository");
class ChangePasswordRepository extends baseRepository_1.BaseRepository {
  constructor() {
    super(lawyerModel_1.lawyerModel);
  }
  changePassword(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
      yield lawyerModel_1.lawyerModel.updateOne(
        { email: email },
        { $set: { password: password } },
      );
    });
  }
}
exports.ChangePasswordRepository = ChangePasswordRepository;
