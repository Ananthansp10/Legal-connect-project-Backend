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
  constructor(_bankRepo) {
    this._bankRepo = _bankRepo;
  }
  execute(appointmentId, fee, lawyerId) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const lawyerBankDetails =
          yield this._bankRepo.findBankDetails(lawyerId);
        let transfer;
        if (lawyerBankDetails) {
          transfer = [
            {
              account: lawyerBankDetails.contactId,
              amount: fee * 100,
              currency: "INR",
            },
          ];
        }
        const options = {
          amount: fee * 100,
          currency: "INR",
          receipt: `reciept_${appointmentId}`,
          transfers: transfer ? transfer : [],
        };
        const razorpayOrder =
          yield razorpayConfig_1.razorpay.orders.create(options);
        const data = {
          orderId: razorpayOrder.id,
          amount: Number(razorpayOrder.amount),
          currency: razorpayOrder.currency,
        };
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    });
  }
}
exports.CreateRazorpayOrderUseCase = CreateRazorpayOrderUseCase;
