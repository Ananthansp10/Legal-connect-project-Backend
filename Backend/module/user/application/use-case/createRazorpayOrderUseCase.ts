import { Types } from "mongoose";
import { ICreateRazorpayOrderUseCase, RazorpayOrder } from "../use-case-interface/ICreateRazorpayOrderUseCase";
import { razorpay } from "../../../../config/razorpayConfig";

export class CreateRazorpayOrderUseCase implements ICreateRazorpayOrderUseCase {

    async execute(appointmentId: Types.ObjectId, fee: number): Promise<RazorpayOrder> {
        const options = {
            amount: fee * 100,
            currency: 'INR',
            receipt: `reciept_${appointmentId}`
        }
        const razorpayOrder = await razorpay.orders.create(options)
        const data = {
            orderId: razorpayOrder.id,
            amount: Number(razorpayOrder.amount),
            currency: razorpayOrder.currency,
        }
        return data
    }
}