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
exports.AddPlanUseCase = void 0;
const errorException_1 = require("../../../../common/error/errorException");
const AppStatusCode_1 = require("../../../../common/statusCode/AppStatusCode");
class AddPlanUseCase {
  constructor(_planManagementRepository) {
    this._planManagementRepository = _planManagementRepository;
  }
  execute(data) {
    return __awaiter(this, void 0, void 0, function* () {
      const isPlanExist = yield this._planManagementRepository.isPlanExist(
        data.name,
      );
      if (isPlanExist) {
        throw new errorException_1.AppException(
          "Plan Already exist",
          AppStatusCode_1.AppStatusCode.CONFLICT,
        );
      } else {
        yield this._planManagementRepository.addPlan(
          Object.assign(Object.assign({}, data), {
            status: true,
            isDeleted: false,
          }),
        );
      }
    });
  }
}
exports.AddPlanUseCase = AddPlanUseCase;
