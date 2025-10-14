import { Types } from "mongoose";
import { IReviewResponseDto } from "../../domain/dtos/reviewResponseDto";

export interface IGetReviewUseCase {
  execute(lawyerId: Types.ObjectId): Promise<IReviewResponseDto | null>;
}
