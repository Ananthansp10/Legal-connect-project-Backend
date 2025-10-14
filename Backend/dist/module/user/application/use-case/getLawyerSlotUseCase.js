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
exports.GetLawyerSlotUseCase = void 0;
const generateTimesSlots_1 = require("../../infrastructure/services/generateTimesSlots");
class GetLawyerSlotUseCase {
  constructor(_getLawyerSlotRepo) {
    this._getLawyerSlotRepo = _getLawyerSlotRepo;
  }
  execute(lawyerId, date) {
    return __awaiter(this, void 0, void 0, function* () {
      const rule = yield this._getLawyerSlotRepo.findSlot(lawyerId, date);
      const mostPriorityRule = rule.sort((a, b) => b.priority - a.priority);
      let slots;
      if (mostPriorityRule.length > 0) {
        slots = (0, generateTimesSlots_1.generateSlots)(
          mostPriorityRule[0],
          lawyerId,
          date,
          this._getLawyerSlotRepo,
        );
      }
      return slots;
    });
  }
}
exports.GetLawyerSlotUseCase = GetLawyerSlotUseCase;
