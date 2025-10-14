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
exports.GetUsersUseCase = void 0;
const userMapper_1 = require("../mapper/userMapper");
class GetUsersUseCase {
  constructor(_userRepo) {
    this._userRepo = _userRepo;
  }
  execute(startIndex, limit) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const user = yield this._userRepo.findAll(startIndex, limit);
        let response = [];
        if (user) {
          response = yield userMapper_1.UserMapper.toResponse(user.data);
        }
        return {
          data: response,
          totalData:
            (user === null || user === void 0 ? void 0 : user.totalData) || 0,
        };
      } catch (error) {
        throw error;
      }
    });
  }
}
exports.GetUsersUseCase = GetUsersUseCase;
