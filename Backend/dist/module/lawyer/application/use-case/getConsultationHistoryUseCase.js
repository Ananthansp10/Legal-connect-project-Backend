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
exports.GetConsultationHistoryUseCase = void 0;
const consultationHistoryMapper_1 = require("../mapper/consultationHistoryMapper");
class GetConsultationHistoryUseCase {
  constructor(_appointmentRepo) {
    this._appointmentRepo = _appointmentRepo;
  }
  execute(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
      let consultations =
        yield this._appointmentRepo.getConsultationHistory(caseId);
      if (!consultations || consultations.length == 0) {
        return [];
      } else {
        return yield consultationHistoryMapper_1.ConsultationHistoryMapper.toResponse(
          consultations,
        );
      }
    });
  }
}
exports.GetConsultationHistoryUseCase = GetConsultationHistoryUseCase;
