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
exports.GetAllChatUseCase = void 0;
class GetAllChatUseCase {
  constructor(_chatRepo) {
    this._chatRepo = _chatRepo;
  }
  execute(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      const userChats = yield this._chatRepo.findUserChat(userId);
      if (!userChats || userChats.length === 0) {
        return [];
      }
      const chatDetails = yield Promise.all(
        userChats === null || userChats === void 0
          ? void 0
          : userChats.map((chat) =>
              __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                let lawyerDetails = yield this._chatRepo.findLawyerDetails(
                  chat.participants[1],
                );
                return {
                  lawyerId: chat.participants[1],
                  name:
                    (_a =
                      lawyerDetails === null || lawyerDetails === void 0
                        ? void 0
                        : lawyerDetails.personalInfo.name) !== null &&
                    _a !== void 0
                      ? _a
                      : "",
                  profileImage:
                    (_b =
                      lawyerDetails === null || lawyerDetails === void 0
                        ? void 0
                        : lawyerDetails.personalInfo.profileImage) !== null &&
                    _b !== void 0
                      ? _b
                      : "",
                  lastMessage: chat.messages[chat.messages.length - 1].message,
                  lastMessageTime:
                    chat.messages[chat.messages.length - 1].createdAt,
                  unreadCount: chat.messages.filter(
                    (msg) =>
                      msg.receiverId.toString() == userId.toString() &&
                      !msg.isRead,
                  ).length,
                  isOnline: true,
                };
              }),
            ),
      );
      return chatDetails.reverse();
    });
  }
}
exports.GetAllChatUseCase = GetAllChatUseCase;
