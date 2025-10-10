import { Types } from "mongoose";
import { IFeedbackEntity, IReviews } from "../../domain/entity/feedbackEntity";

export interface IFeedbackRepository {
  getfeedback(lawyerId: Types.ObjectId): Promise<IFeedbackEntity | null>;
  saveReview(data: IFeedbackEntity): Promise<void>;
  addReview(lawyerId: Types.ObjectId, data: IReviews): Promise<void>;
}
