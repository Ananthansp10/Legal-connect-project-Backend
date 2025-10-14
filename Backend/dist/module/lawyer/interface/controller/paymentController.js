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
exports.PaymentController = void 0;
const AppEnumError_1 = require("../../../../common/error/AppEnumError");
const AppStatusCode_1 = require("../../../../common/statusCode/AppStatusCode");
const errorException_1 = require("../../../../common/error/errorException");
class PaymentController {
  constructor(_createRazorpayOrderUseCase, _verifyRazorpayPaymentUseCase) {
    this._createRazorpayOrderUseCase = _createRazorpayOrderUseCase;
    this._verifyRazorpayPaymentUseCase = _verifyRazorpayPaymentUseCase;
  }
  createRazorpayOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const order = yield this._createRazorpayOrderUseCase.execute(
          req.body.planId,
          req.body.price,
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Razorpay order created successfully",
          data: Object.assign(Object.assign({}, order), {
            planId: req.body.planId,
          }),
        });
      } catch (_error) {
        res
          .status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE)
          .json({
            success: false,
            message: AppEnumError_1.AppError.UNKNOWN_ERROR,
          });
      }
    });
  }
  verifyPayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._verifyRazorpayPaymentUseCase.execute(req.body);
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Payment successfull" });
      } catch (error) {
        console.log(error);
        if (error instanceof errorException_1.AppException) {
          res
            .status(error.statusCode)
            .json({ success: false, message: error.message });
        } else {
          res
            .status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE)
            .json({
              success: false,
              message: AppEnumError_1.AppError.UNKNOWN_ERROR,
            });
        }
      }
    });
  }
}
exports.PaymentController = PaymentController;
