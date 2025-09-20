import { Types } from "mongoose";


export interface IUpdateReportedAccountStatusUseCase {
    execute(reportedAccountId: Types.ObjectId): Promise<void>;
}