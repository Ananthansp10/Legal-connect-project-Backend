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
exports.LawyerChatRepository = void 0;
const chatModel_1 = require("../../../user/infrastructure/models/chatModel");
const userProfileModel_1 = require("../../../user/infrastructure/models/userProfileModel");
class LawyerChatRepository {
  findAllChats(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield chatModel_1.chatModel.find({
        participants: { $in: [lawyerId] },
      });
    });
  }
  findChat(lawyerId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
      const chat = yield chatModel_1.chatModel.findOne({
        participants: { $all: [lawyerId, userId] },
      });
      return (chat === null || chat === void 0 ? void 0 : chat.messages)
        ? chat.messages
        : null;
    });
  }
  addChat(chat) {
    return __awaiter(this, void 0, void 0, function* () {
      yield chatModel_1.chatModel.create(chat);
    });
  }
  addMesssage(lawyerId, userId, message) {
    return __awaiter(this, void 0, void 0, function* () {
      yield chatModel_1.chatModel.updateOne(
        { participants: { $all: [lawyerId, userId] } },
        { $push: { messages: message } },
      );
    });
  }
  findUserDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield userProfileModel_1.userProfileModel.findOne({
        userId: userId,
      });
    });
  }
  updateReadStatus(lawyerId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
      yield chatModel_1.chatModel.updateMany(
        { participants: { $all: [lawyerId, userId] } },
        {
          $set: { "messages.$[msg].isRead": true },
        },
        {
          arrayFilters: [{ "msg.isRead": false, "msg.receiverId": lawyerId }],
        },
      );
    });
  }
}
exports.LawyerChatRepository = LawyerChatRepository;
