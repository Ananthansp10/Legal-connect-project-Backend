import { Types } from "mongoose";

export interface IReportsData {
  reporterId: Types.ObjectId;
  reporterName: string;
  reason: string;
  date: string;
  description: string;
}

export interface IReportAccountDto {
  _id: Types.ObjectId;
  reportedId: Types.ObjectId;
  reportsCount: number;
  reportedName: string;
  userType: string;
  latestReportReason: string;
  status: string;
  reportedUserProfileImage: string;
  reports: IReportsData[];
}
