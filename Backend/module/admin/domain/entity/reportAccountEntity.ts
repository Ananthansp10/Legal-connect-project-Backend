import { Types } from "mongoose";

export interface ReportsData{
    reason:string;
    description:string;
    reporterId:Types.ObjectId;
    date:string;
}


export interface IReportAccountEntity{
    _id ? :Types.ObjectId;
    reportedId:Types.ObjectId
    userType:string;
    reports:ReportsData[];
    status:string;
}