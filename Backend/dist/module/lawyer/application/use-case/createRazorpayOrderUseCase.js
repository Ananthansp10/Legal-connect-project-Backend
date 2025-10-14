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
exports.CreateRazorpayOrderUseCase = void 0;
const razorpayConfig_1 = require("../../../../config/razorpayConfig");
class CreateRazorpayOrderUseCase {
  execute(planId, price) {
    return __awaiter(this, void 0, void 0, function* () {
      let options = {
        amount: price * 100,
        currency: "INR",
        receipt: `receipt_${planId}`,
      };
      const order = yield razorpayConfig_1.razorpay.orders.create(options);
      return order;
    });
  }
}
exports.CreateRazorpayOrderUseCase = CreateRazorpayOrderUseCase;
