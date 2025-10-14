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
exports.UnverifiedLawyerMapper = void 0;
class UnverifiedLawyerMapper {
  static toResponse(data) {
    return __awaiter(this, void 0, void 0, function* () {
      const response = data.map((lawyerData) => {
        return {
          _id: lawyerData._id,
          name: lawyerData.name,
          email: lawyerData.email,
          specialization: lawyerData.specialization,
          documents: lawyerData.documents,
          barCouncilNumber: lawyerData.barCouncilNumber,
          status: lawyerData.verified,
        };
      });
      return response;
    });
  }
}
exports.UnverifiedLawyerMapper = UnverifiedLawyerMapper;
