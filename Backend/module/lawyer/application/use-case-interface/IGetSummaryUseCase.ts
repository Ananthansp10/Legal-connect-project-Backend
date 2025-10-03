import { Types } from "mongoose";
import { SummaryDto } from "../../domain/dtos/summaryDto";

export interface IGetSummaryUseCase {
  execute(lawyerId: Types.ObjectId): Promise<SummaryDto | null>;
}
