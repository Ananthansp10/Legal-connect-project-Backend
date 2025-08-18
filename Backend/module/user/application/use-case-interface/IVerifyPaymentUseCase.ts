import { Types } from "mongoose";

export interface PaymentData{
    razorpay_payment_id:string;
    razorpay_order_id:string;
    razorpay_signature:string;
    appointmentId:Types.ObjectId
}

export interface IVerifyPaymentUseCase{
    execute(data:PaymentData):Promise<void>;
}