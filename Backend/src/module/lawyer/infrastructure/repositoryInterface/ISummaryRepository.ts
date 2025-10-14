import { Types } from "mongoose";
import { ISummaryDto } from "../../domain/dtos/summaryDto";

export interface ISummaryRepository {
  getSummary(lawyerId: Types.ObjectId): Promise<ISummaryDto | null>;
}
