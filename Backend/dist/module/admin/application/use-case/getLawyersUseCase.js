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
exports.GetLawyersUseCase = void 0;
const lawyerMapper_1 = require("../mapper/lawyerMapper");
class GetLawyersUseCase {
  constructor(_lawyerRepo) {
    this._lawyerRepo = _lawyerRepo;
  }
  execute(startIndex, limit) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const lawyers = yield this._lawyerRepo.findAll(startIndex, limit);
        let response = [];
        if (lawyers) {
          response = yield lawyerMapper_1.LawyerMapper.toResponse(lawyers.data);
        }
        return {
          data: response,
          totalData:
            (lawyers === null || lawyers === void 0
              ? void 0
              : lawyers.totalData) || 0,
        };
      } catch (error) {
        throw error;
      }
    });
  }
}
exports.GetLawyersUseCase = GetLawyersUseCase;
