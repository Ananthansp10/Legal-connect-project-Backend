import { Types } from "mongoose";


export interface IReportRepository{
    reportLawyer(lawyerId:Types.ObjectId):Promise<void>;
}