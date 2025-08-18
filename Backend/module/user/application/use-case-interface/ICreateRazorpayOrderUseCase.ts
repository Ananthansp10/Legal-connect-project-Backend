import { Types } from "mongoose";

export interface RazorpayOrder{
    orderId:string;
    amount:number;
    currency:string;
}

export interface ICreateRazorpayOrderUseCase{
    execute(appointmentId:Types.ObjectId,fee:number):Promise<RazorpayOrder>;
}