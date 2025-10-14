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
exports.ChatRepository = void 0;
const chatModel_1 = require("../models/chatModel");
const lawyerProfileModel_1 = require("../../../lawyer/infrastructure/models/lawyerProfileModel");
class ChatRepository {
  saveChat(data) {
    return __awaiter(this, void 0, void 0, function* () {
      yield chatModel_1.chatModel.create(data);
    });
  }
  findChatConnection(userId, lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield chatModel_1.chatModel.findOne({
        participants: { $all: [userId, lawyerId] },
      });
    });
  }
  addMessage(userId, lawyerId, message) {
    return __awaiter(this, void 0, void 0, function* () {
      yield chatModel_1.chatModel.updateOne(
        { participants: { $all: [userId, lawyerId] } },
        { $push: { messages: message } },
      );
    });
  }
  findUserChat(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield chatModel_1.chatModel.find({
        participants: { $in: [userId] },
      });
    });
  }
  findLawyerDetails(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield lawyerProfileModel_1.lawyerProfileModel.findOne({
        lawyerId: lawyerId,
      });
    });
  }
  updateChatReadStatus(userId, lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      yield chatModel_1.chatModel.updateMany(
        { participants: { $all: [userId, lawyerId] } },
        {
          $set: { "messages.$[msg].isRead": true },
        },
        {
          arrayFilters: [{ "msg.receiverId": userId, "msg.isRead": false }],
        },
      );
    });
  }
}
exports.ChatRepository = ChatRepository;
