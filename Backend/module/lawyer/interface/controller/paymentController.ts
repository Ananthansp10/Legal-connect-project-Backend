import { AppError } from "../../../../common/error/AppEnumError";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { ICreateRazorpayOrderUseCase } from "../../application/use-case-interface/ICreateRazorpayOrderUseCase";
import { Request, Response } from "express";
import { IVerifyRazorpayPaymentUseCase } from "../../application/use-case-interface/IVerifyRazorpayPaymentUseCase";
import { AppException } from "../../../../common/error/errorException";

export class PaymentController {
  constructor(
    private _createRazorpayOrderUseCase: ICreateRazorpayOrderUseCase,
    private _verifyRazorpayPaymentUseCase: IVerifyRazorpayPaymentUseCase,
  ) {}

  async createRazorpayOrder(req: Request, res: Response) {
    try {
      const order = await this._createRazorpayOrderUseCase.execute(
        req.body.planId,
        req.body.price,
      );
      res
        .status(AppStatusCode.SUCCESS_CODE)
        .json({
          success: true,
          message: "Razorpay order created successfully",
          data: { ...order, planId: req.body.planId },
        });
    } catch (error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }

  async verifyPayment(req: Request, res: Response) {
    try {
      await this._verifyRazorpayPaymentUseCase.execute(req.body);
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
