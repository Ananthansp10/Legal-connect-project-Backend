import { Types } from "mongoose";
import { IRefundPayment } from "./IRefundPaymentService";
import { razorpay } from "../../../../config/razorpayConfig";
import { IAppointmentRepository } from "../repositoryInterface/IAppointmentRepository";


export class RefundPayment implements IRefundPayment{

    constructor(
        private _appointmentRepo:IAppointmentRepository
    ){}

    async execute(appointmentId:Types.ObjectId,paymentId: string): Promise<void> {
        let refund=await (razorpay.payments as any).refund(paymentId,{
            speed:"normal",
            notes:{reason:"Appointment Cancelled"}
        })

        await this._appointmentRepo.refundPayment(appointmentId,refund.status)
    }
}