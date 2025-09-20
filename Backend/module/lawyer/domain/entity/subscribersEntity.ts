import { Types } from "mongoose";

export interface PlanDetail {
    planId: Types.ObjectId;
    date: string;
    price: number;
}


export interface ISubscribersEntity {
    lawyerId: Types.ObjectId;
    plans: PlanDetail[];
}