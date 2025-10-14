import { Types } from "mongoose";

export interface IPlansResponseDto {
  _id?: Types.ObjectId;
  name: string;
  price: number;
  duration: number;
  planType: string;
  features: string[];
  status: boolean;
  isDeleted: boolean;
}

export interface IPlanDetail {
  planId: Types.ObjectId;
  date: string;
  price: number;
  activationDate: string;
  expireDate: string;
  isActive: boolean;
  totalAppointments: number;
  appointmentsCount: number;
  planName: string;
}

export interface ISubscriptionPlanResponseDto {
  lawyerId: Types.ObjectId;
  plans: IPlanDetail[];
}
