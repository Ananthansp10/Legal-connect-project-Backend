import { Types } from "mongoose";

export interface RazorpayOrder {
  id: string;
  entity: "order";
  amount: number;
  amount_paid: number;
  currency: string;
  receipt: string;
  status: "created" | "attempted" | "paid";
  attempts: number;
  notes: Record<string, any>;
  created_at?: number;
}


export interface ICreateRazorpayOrderUseCase{
    execute(planId:Types.ObjectId,price:number):Promise<RazorpayOrder>;
}