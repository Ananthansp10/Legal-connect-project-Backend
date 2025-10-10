import { IReviews } from "../entity/feedbackEntity";

export interface IReviewResponseDto {
  reviewsCount: number;
  rating: number;
  reviews: IReviews[];
}
