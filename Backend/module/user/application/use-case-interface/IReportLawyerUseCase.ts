import { Types } from "mongoose";


export interface IReportLawyerUseCase{
    execute(lawyerId:Types.ObjectId):Promise<void>;
}