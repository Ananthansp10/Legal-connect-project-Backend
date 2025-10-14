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
exports.AddChatUseCase = void 0;
class AddChatUseCase {
  constructor(_chatRepo) {
    this._chatRepo = _chatRepo;
  }
  execute(userId, lawyerId, message) {
    return __awaiter(this, void 0, void 0, function* () {
      const findChatExist = yield this._chatRepo.findChatConnection(
        userId,
        lawyerId,
      );
      if (findChatExist) {
        yield this._chatRepo.addMessage(userId, lawyerId, message);
      } else {
        const chatObj = {
          participants: [userId, lawyerId],
          messages: [message],
        };
        yield this._chatRepo.saveChat(chatObj);
      }
    });
  }
}
exports.AddChatUseCase = AddChatUseCase;
