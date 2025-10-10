import { Types } from "mongoose";

export interface IReportsData {
  reason: string;
  description: string;
  reporterId: Types.ObjectId;
  date: string;
}

export interface IReportAccountEntity {
  _id?: Types.ObjectId;
  reportedId: Types.ObjectId;
  userType: string;
  reports: IReportsData[];
  status: string;
}
