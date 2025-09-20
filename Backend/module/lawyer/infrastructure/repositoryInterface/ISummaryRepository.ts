import { Types } from "mongoose";
import { SummaryDto } from "../../domain/dtos/summaryDto";


export interface ISummaryRepository {
    getSummary(lawyerId: Types.ObjectId): Promise<SummaryDto | null>;
}