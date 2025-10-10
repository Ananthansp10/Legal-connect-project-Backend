import { Types } from "mongoose";

export interface IPaymentDataRequestDto {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  appointmentId: Types.ObjectId;
}

export interface IVerifyPaymentUseCase {
  execute(data: IPaymentDataRequestDto): Promise<void>;
}
