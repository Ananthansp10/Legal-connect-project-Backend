import { Types } from "mongoose";

export interface IPlansEntity {
  _id?: Types.ObjectId;
  name: string;
  price: number;
  duration: number;
  planType: string;
  features: string[];
  status: boolean;
  isDeleted: boolean;
}
