import { Types } from "mongoose";
import {
  ICreateRazorpayOrderUseCase,
  RazorpayOrder,
} from "../use-case-interface/ICreateRazorpayOrderUseCase";
import { razorpay } from "../../../../config/razorpayConfig";
import { IBankDetailsRepository } from "../../infrastructure/repositoryInterface/IBankDetailsRepository";

export class CreateRazorpayOrderUseCase implements ICreateRazorpayOrderUseCase {
  constructor(private _bankRepo: IBankDetailsRepository) {}

  async execute(
    appointmentId: Types.ObjectId,
    fee: number,
    lawyerId: Types.ObjectId,
  ): Promise<RazorpayOrder> {
    try {
      const lawyerBankDetails = await this._bankRepo.findBankDetails(lawyerId);
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
      const razorpayOrder = await razorpay.orders.create(options);
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
  }
}
