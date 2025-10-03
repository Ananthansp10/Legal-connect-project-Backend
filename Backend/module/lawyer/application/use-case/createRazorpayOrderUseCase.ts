import { Types } from "mongoose";
import {
  ICreateRazorpayOrderUseCase,
  RazorpayOrder,
} from "../use-case-interface/ICreateRazorpayOrderUseCase";
import { razorpay } from "../../../../config/razorpayConfig";

export class CreateRazorpayOrderUseCase implements ICreateRazorpayOrderUseCase {
  async execute(planId: Types.ObjectId, price: number): Promise<RazorpayOrder> {
    let options = {
      amount: price * 100,
      currency: "INR",
      receipt: `receipt_${planId}`,
    };
    const order = (await razorpay.orders.create(options)) as RazorpayOrder;
    return order;
  }
}
