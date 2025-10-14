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
exports.VerifyPaymentUseCase = void 0;
const errorException_1 = require("../../../../common/error/errorException");
const paymentStatus_1 = require("../../../../common/status/paymentStatus");
const AppStatusCode_1 = require("../../../../common/statusCode/AppStatusCode");
const crypto_1 = __importDefault(require("crypto"));
class VerifyPaymentUseCase {
  constructor(_appointmentRepo) {
    this._appointmentRepo = _appointmentRepo;
  }
  execute(data) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const {
          razorpay_order_id: razorpayOrderId,
          razorpay_payment_id,
          razorpay_signature,
          appointmentId,
        } = data;
        const hmac = crypto_1.default.createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET,
        );
        hmac.update(razorpayOrderId + "|" + razorpay_payment_id);
        const generatedSignature = hmac.digest("hex");
        if (generatedSignature === razorpay_signature) {
          yield this._appointmentRepo.updatePayment(
            appointmentId,
            paymentStatus_1.PaymentStatus.SUCCESS,
            razorpay_payment_id,
          );
        } else {
          yield this._appointmentRepo.updatePayment(
            appointmentId,
            paymentStatus_1.PaymentStatus.FAILED,
            razorpay_payment_id,
          );
          throw new errorException_1.AppException(
            "Payment failed",
            AppStatusCode_1.AppStatusCode.PAYMENT_FAILED,
          );
        }
        return;
      } catch (error) {
        throw error;
      }
    });
  }
}
exports.VerifyPaymentUseCase = VerifyPaymentUseCase;
