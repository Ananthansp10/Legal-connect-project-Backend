import { Types } from "mongoose";

export interface IRazorpayOrder {
  orderId: string;
  amount: number;
  currency: string;
}

export interface ICreateRazorpayOrderUseCase {
  execute(
    appointmentId: Types.ObjectId,
    fee: number,
    lawyerId: Types.ObjectId,
  ): Promise<IRazorpayOrder>;
}
