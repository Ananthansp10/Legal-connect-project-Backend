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
exports.AddReviewUseCase = void 0;
class AddReviewUseCase {
  constructor(_feedbackRepo) {
    this._feedbackRepo = _feedbackRepo;
  }
  execute(lawyerId, data) {
    return __awaiter(this, void 0, void 0, function* () {
      const reviewExist = yield this._feedbackRepo.getfeedback(lawyerId);
      if (reviewExist) {
        yield this._feedbackRepo.addReview(lawyerId, data);
      } else {
        const reviewObj = {
          lawyerId: lawyerId,
          reviews: [data],
        };
        yield this._feedbackRepo.saveReview(reviewObj);
      }
    });
  }
}
exports.AddReviewUseCase = AddReviewUseCase;
