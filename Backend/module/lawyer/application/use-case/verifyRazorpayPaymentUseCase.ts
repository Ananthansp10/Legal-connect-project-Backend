import { AppException } from "../../../../common/error/errorException";
import { IVerifyRazorpayPaymentUseCase, RazorpayPaymentData } from "../use-case-interface/IVerifyRazorpayPaymentUseCase";
import crypto from 'crypto'

export class VerifyRazorpayPaymentUseCase implements IVerifyRazorpayPaymentUseCase{

    async execute(data:RazorpayPaymentData): Promise<void> {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data
             const secret = process.env.RAZORPAY_KEY_SECRET as string
             const generatedSignature = crypto
                .createHmac("sha256", secret!)
                .update(razorpay_order_id + "|" + razorpay_payment_id)
                .digest("hex")

                if(generatedSignature==razorpay_signature){
                    return
                }else{
                    throw new AppException("Payment failed",402)
                }
        } catch (error) {
            throw error
        }
    }
}