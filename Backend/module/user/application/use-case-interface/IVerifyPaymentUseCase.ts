import { Types } from "mongoose";

export interface PaymentDataRequestDto {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    appointmentId: Types.ObjectId
}

export interface IVerifyPaymentUseCase {
    execute(data: PaymentDataRequestDto): Promise<void>;
}