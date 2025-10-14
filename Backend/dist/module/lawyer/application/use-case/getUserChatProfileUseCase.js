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
exports.GetUserChatProfileUseCase = void 0;
class GetUserChatProfileUseCase {
  constructor(_chatRepo) {
    this._chatRepo = _chatRepo;
  }
  execute(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a, _b, _c, _d;
      const userProfile = yield this._chatRepo.findUserDetails(userId);
      return {
        name:
          (_a =
            userProfile === null || userProfile === void 0
              ? void 0
              : userProfile.name) !== null && _a !== void 0
            ? _a
            : "",
        profileImage:
          (_b =
            userProfile === null || userProfile === void 0
              ? void 0
              : userProfile.profileImage) !== null && _b !== void 0
            ? _b
            : "",
        country:
          (_c =
            userProfile === null || userProfile === void 0
              ? void 0
              : userProfile.address.country) !== null && _c !== void 0
            ? _c
            : "",
        state:
          (_d =
            userProfile === null || userProfile === void 0
              ? void 0
              : userProfile.address.state) !== null && _d !== void 0
            ? _d
            : "",
      };
    });
  }
}
exports.GetUserChatProfileUseCase = GetUserChatProfileUseCase;
