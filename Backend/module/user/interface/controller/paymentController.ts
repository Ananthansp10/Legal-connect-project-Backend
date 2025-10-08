import { Request, Response } from "express";
import { ICreateRazorpayOrderUseCase } from "../../application/use-case-interface/ICreateRazorpayOrderUseCase";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { AppError } from "../../../../common/error/AppEnumError";
import { IVerifyPaymentUseCase } from "../../application/use-case-interface/IVerifyPaymentUseCase";
import { AppException } from "../../../../common/error/errorException";
import mongoose from "mongoose";

export class PaymentController {
  constructor(
    private _createRazorpayOrderUseCase: ICreateRazorpayOrderUseCase,
    private _verifyPaymentUseCase: IVerifyPaymentUseCase,
  ) {}

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
    } catch (error) {
      res
        .status(AppStatusCode.INTERNAL_ERROR_CODE)
        .json({ success: false, message: AppError.UNKNOWN_ERROR });
    }
  }

  async verifyPayment(req: Request, res: Response) {
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
