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
exports.GetLawyerAllChatUseCase = void 0;
const mongoose_1 = require("mongoose");
class GetLawyerAllChatUseCase {
  constructor(_chatRepo) {
    this._chatRepo = _chatRepo;
  }
  execute(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      const chats = yield this._chatRepo.findAllChats(lawyerId);
      if (!chats || chats.length == 0) {
        return null;
      }
      const chatDetails = yield Promise.all(
        chats.map((chat) =>
          __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const userDetails = yield this._chatRepo.findUserDetails(
              chat.participants[0],
            );
            return {
              userId:
                (_a =
                  userDetails === null || userDetails === void 0
                    ? void 0
                    : userDetails.userId) !== null && _a !== void 0
                  ? _a
                  : new mongoose_1.Types.ObjectId(""),
              name:
                (_b =
                  userDetails === null || userDetails === void 0
                    ? void 0
                    : userDetails.name) !== null && _b !== void 0
                  ? _b
                  : "",
              profileImage:
                (_c =
                  userDetails === null || userDetails === void 0
                    ? void 0
                    : userDetails.profileImage) !== null && _c !== void 0
                  ? _c
                  : "",
              lastMessage: chat.messages[chat.messages.length - 1].message,
              lastMessageTime:
                chat.messages[chat.messages.length - 1].createdAt,
              unreadCount: chat.messages.filter(
                (msg) =>
                  msg.receiverId.toString() == lawyerId.toString() &&
                  !msg.isRead,
              ).length,
            };
          }),
        ),
      );
      return chatDetails.reverse();
    });
  }
}
exports.GetLawyerAllChatUseCase = GetLawyerAllChatUseCase;
