import { Types } from "mongoose";
import { IReviewResponseDto } from "../../domain/dtos/reviewResponseDto";
import { IFeedbackRepository } from "../../infrastructure/repositoryInterface/IFeedbackRepository";
import { IGetReviewUseCase } from "../use-case-interface/IGetReviewUseCase";

export class GetReviewUseCase implements IGetReviewUseCase {
  constructor(private _feedbackRepo: IFeedbackRepository) {}

  async execute(lawyerId: Types.ObjectId): Promise<IReviewResponseDto | null> {
    const reviews = await this._feedbackRepo.getfeedback(lawyerId);
    const reviewResponseObj = {
      reviewsCount: reviews?.reviews.length || 0,
      rating: reviews?.reviews
        ? reviews.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
          reviews.reviews.length
        : 0,
      reviews: reviews?.reviews.reverse() || [],
    };
    return reviewResponseObj;
  }
}
