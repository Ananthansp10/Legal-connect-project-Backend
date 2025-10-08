import { Request, Response } from "express";
import { ICreateRazorpayOrderUseCase } from "../../application/use-case-interface/ICreateRazorpayOrderUseCase";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { AppError } from "../../../../common/error/AppEnumError";
import { IVerifyPaymentUseCase } from "../../application/use-case-interface/IVerifyPaymentUseCase";
import { AppException } from "../../../../common/error/errorException";

export class PaymentController {
  constructor(
    private _createRazorpayOrderUseCase: ICreateRazorpayOrderUseCase,
    private _verifyPaymentUseCase: IVerifyPaymentUseCase,
  ) {}
  /**
   * @async
   * @method createOrder
   * @param {Request} req The request object with order details as body for razorpay order
   * @param {Response} res The response object
   * @returns {promise<void>} The json response containing order created details of razorpay
   */
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const result = await this._createRazorpayOrderUseCase.execute(
        req.body.id,
        req.body.fee,
        req.body.lawyerId,
      );
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, data: result });
    } catch (_error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }
  /**
   * @async
   * @method verifyPayment
   * @param {Request} req The request object with razorpay payment details as body
   * @param {Response} res The response object
   * @returns {Promise<void>} The json response with success message or error message
   */
  async verifyPayment(req: Request, res: Response): Promise<void> {
    try {
      await this._verifyPaymentUseCase.execute(req.body);
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({ success: true, message: "Payment successfull" });
    } catch (error) {
      if (error instanceof AppException) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
      } else {
        res
          .status(AppStatusCode.INTERNAL_ERROR_CODE)
          .json({ success: false, message: AppError.UNKNOWN_ERROR });
      }
    }
  }
}
