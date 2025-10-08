import { Types } from "mongoose";

export interface IPlanDetail {
  planId: Types.ObjectId;
  date: string;
  price: number;
  activationDate: string;
  expireDate: string;
  isActive: boolean;
  totalAppointments: number;
  appointmentsCount: number;
}

export interface ISubscribersEntity {
  lawyerId: Types.ObjectId;
  plans: IPlanDetail[];
}
