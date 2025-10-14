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
exports.FilterUserUseCase = void 0;
const userMapper_1 = require("../mapper/userMapper");
class FilterUserUseCase {
  constructor(_userRepo) {
    this._userRepo = _userRepo;
  }
  execute(status) {
    return __awaiter(this, void 0, void 0, function* () {
      const users = yield this._userRepo.filterUser(status);
      let response = [];
      if (users) {
        response = yield userMapper_1.UserMapper.toResponse(users);
      }
      return response;
    });
  }
}
exports.FilterUserUseCase = FilterUserUseCase;
