import { AppException } from "../../../../common/error/errorException";
import { PaymentStatus } from "../../../../common/status/paymentStatus";
import { AppStatusCode } from "../../../../common/statusCode/AppStatusCode";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { IVerifyPaymentUseCase, PaymentDataRequestDto } from "../use-case-interface/IVerifyPaymentUseCase";
import crypto from 'crypto'

export class VerifyPaymentUseCase implements IVerifyPaymentUseCase {

    constructor(
        private _appointmentRepo: IAppointmentRepository
    ) { }

    async execute(data: PaymentDataRequestDto): Promise<void> {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = data

            const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)

            hmac.update(razorpay_order_id + "|" + razorpay_payment_id)

            const generatedSignature = hmac.digest("hex")

            if (generatedSignature === razorpay_signature) {
                await this._appointmentRepo.updatePayment(appointmentId, PaymentStatus.SUCCESS, razorpay_payment_id)
            } else {
                await this._appointmentRepo.updatePayment(appointmentId, PaymentStatus.FAILED, razorpay_payment_id)
                throw new AppException("Payment failed", AppStatusCode.PAYMENT_FAILED)
            }

            return

        } catch (error) {
            throw error
        }
    }
}