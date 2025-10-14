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
exports.GetLawyerUseCase = void 0;
const getLawyerMapper_1 = require("../mapper/getLawyerMapper");
class GetLawyerUseCase {
  constructor(_getLawyerRepo) {
    this._getLawyerRepo = _getLawyerRepo;
  }
  execute() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const lawyer = yield this._getLawyerRepo.findAll();
        let response = [];
        if (lawyer) {
          response = getLawyerMapper_1.GetLawyerMapper.toResponse(lawyer);
        }
        return response;
      } catch (error) {
        throw error;
      }
    });
  }
}
exports.GetLawyerUseCase = GetLawyerUseCase;
