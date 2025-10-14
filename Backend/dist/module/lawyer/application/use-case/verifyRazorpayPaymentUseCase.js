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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyRazorpayPaymentUseCase = void 0;
const errorException_1 = require("../../../../common/error/errorException");
const crypto_1 = __importDefault(require("crypto"));
class VerifyRazorpayPaymentUseCase {
  execute(data) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          data;
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const generatedSignature = crypto_1.default
          .createHmac("sha256", secret)
          .update(razorpay_order_id + "|" + razorpay_payment_id)
          .digest("hex");
        if (generatedSignature == razorpay_signature) {
          return;
        } else {
          throw new errorException_1.AppException("Payment failed", 402);
        }
      } catch (error) {
        throw error;
      }
    });
  }
}
exports.VerifyRazorpayPaymentUseCase = VerifyRazorpayPaymentUseCase;
