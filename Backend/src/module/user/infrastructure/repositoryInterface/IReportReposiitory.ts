import { Types } from "mongoose";
import { IReportAccountEntity } from "../../../admin/domain/entity/reportAccountEntity";

export interface IReportDataRequestDto {
  reportedId: Types.ObjectId;
  userType: string;
  reason: string;
  description: string;
  reporterId: Types.ObjectId;
  status: string;
}

export interface IReports {
  reason: string;
  description: string;
  reporterId: Types.ObjectId;
}

export interface IReportRepository {
  reportLawyer(data: IReportAccountEntity): Promise<void>;
  findLawyerReportExist(
    lawyerId: Types.ObjectId,
  ): Promise<IReportAccountEntity | null>;
  updateLawyerReport(lawyerId: Types.ObjectId, data: IReports): Promise<void>;
}
