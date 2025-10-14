import { Types } from "mongoose";
import {
  ICreateRazorpayOrderUseCase,
  IRazorpayOrder,
} from "../use-case-interface/ICreateRazorpayOrderUseCase";
import { razorpay } from "../../../../config/razorpayConfig";

export class CreateRazorpayOrderUseCase implements ICreateRazorpayOrderUseCase {
  async execute(
    planId: Types.ObjectId,
    price: number,
  ): Promise<IRazorpayOrder> {
    let options = {
      amount: price * 100,
      currency: "INR",
      receipt: `receipt_${planId}`,
    };
    const order = (await razorpay.orders.create(options)) as IRazorpayOrder;
    return order;
  }
}
