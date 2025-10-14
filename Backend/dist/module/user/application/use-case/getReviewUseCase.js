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
exports.GetReviewUseCase = void 0;
class GetReviewUseCase {
  constructor(_feedbackRepo) {
    this._feedbackRepo = _feedbackRepo;
  }
  execute(lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      const reviews = yield this._feedbackRepo.getfeedback(lawyerId);
      const reviewResponseObj = {
        reviewsCount:
          (reviews === null || reviews === void 0
            ? void 0
            : reviews.reviews.length) || 0,
        rating: (
          reviews === null || reviews === void 0 ? void 0 : reviews.reviews
        )
          ? reviews.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
            reviews.reviews.length
          : 0,
        reviews:
          (reviews === null || reviews === void 0
            ? void 0
            : reviews.reviews.reverse()) || [],
      };
      return reviewResponseObj;
    });
  }
}
exports.GetReviewUseCase = GetReviewUseCase;
