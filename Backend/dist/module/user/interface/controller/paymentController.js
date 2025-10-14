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
const AppStatusCode_1 = require("../../../../common/statusCode/AppStatusCode");
const AppEnumError_1 = require("../../../../common/error/AppEnumError");
const errorException_1 = require("../../../../common/error/errorException");
class PaymentController {
  constructor(_createRazorpayOrderUseCase, _verifyPaymentUseCase) {
    this._createRazorpayOrderUseCase = _createRazorpayOrderUseCase;
    this._verifyPaymentUseCase = _verifyPaymentUseCase;
  }
  /**
   * @async
   * @method createOrder
   * @param {Request} req The request object with order details as body for razorpay order
   * @param {Response} res The response object
   * @returns {promise<void>} The json response containing order created details of razorpay
   */
  createOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._createRazorpayOrderUseCase.execute(
          req.body.id,
          req.body.fee,
          req.body.lawyerId,
        );
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, data: result });
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
  /**
   * @async
   * @method verifyPayment
   * @param {Request} req The request object with razorpay payment details as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  verifyPayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this._verifyPaymentUseCase.execute(req.body);
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Payment successfull" });
      } catch (error) {
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
