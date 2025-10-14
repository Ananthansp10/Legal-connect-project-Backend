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
exports.FilterLawyerUseCase = void 0;
const lawyerMapper_1 = require("../mapper/lawyerMapper");
class FilterLawyerUseCase {
  constructor(_lawyerRepo) {
    this._lawyerRepo = _lawyerRepo;
  }
  execute(status) {
    return __awaiter(this, void 0, void 0, function* () {
      const lawyers = yield this._lawyerRepo.filterLawyer(status);
      let response = [];
      if (lawyers) {
        response = yield lawyerMapper_1.LawyerMapper.toResponse(lawyers);
      }
      return response;
    });
  }
}
exports.FilterLawyerUseCase = FilterLawyerUseCase;
