import { Types } from "mongoose";
import { IReviews } from "../../domain/entity/feedbackEntity";

export interface IAddReviewUseCase {
  execute(lawyerId: Types.ObjectId, data: IReviews): Promise<void>;
}
