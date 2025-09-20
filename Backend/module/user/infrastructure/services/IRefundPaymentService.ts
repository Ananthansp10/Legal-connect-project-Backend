import { Types } from "mongoose";


export interface IRefundPayment {
    execute(appointmentId: Types.ObjectId, paymentId: string): Promise<void>;
}