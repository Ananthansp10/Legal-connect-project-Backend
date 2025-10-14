import { Types } from "mongoose";
import { ISummaryDto } from "../../domain/dtos/summaryDto";

export interface IGetSummaryUseCase {
  execute(lawyerId: Types.ObjectId): Promise<ISummaryDto | null>;
}
