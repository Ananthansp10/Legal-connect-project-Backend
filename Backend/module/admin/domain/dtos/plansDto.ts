import { Types } from "mongoose";

export interface IPlansRequestDto {
  _id?: Types.ObjectId;
  name: string;
  price: number;
  duration: number;
  planType: string;
  totalAppointments: string;
  features: string[];
  status: boolean;
  isDeleted: boolean;
}

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
