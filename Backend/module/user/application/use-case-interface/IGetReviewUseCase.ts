import { Types } from "mongoose";
import { ReviewResponseDto } from "../../domain/dtos/reviewResponseDto";


export interface IGetReviewUseCase {
    execute(lawyerId: Types.ObjectId): Promise<ReviewResponseDto | null>;
}