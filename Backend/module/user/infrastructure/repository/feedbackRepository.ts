import { Types } from "mongoose";
import { IFeedbackEntity, IReviews } from "../../domain/entity/feedbackEntity";
import { IFeedbackRepository } from "../repositoryInterface/IFeedbackRepository";
import { reviewsModel } from "../models/reviewsModel";

export class FeedbackRepository implements IFeedbackRepository {
  async getfeedback(lawyerId: Types.ObjectId): Promise<IFeedbackEntity | null> {
    return await reviewsModel.findOne({ lawyerId: lawyerId });
  }

  async saveReview(data: IFeedbackEntity): Promise<void> {
    await reviewsModel.create(data);
  }

  async addReview(lawyerId: Types.ObjectId, data: IReviews): Promise<void> {
    await reviewsModel.updateOne(
      { lawyerId: lawyerId },
      { $push: { reviews: data } },
    );
  }
}
