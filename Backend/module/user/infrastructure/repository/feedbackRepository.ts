import { Types } from "mongoose";
import { FeedbackEntity, Reviews } from "../../domain/entity/feedbackEntity";
import { IFeedbackRepository } from "../repositoryInterface/IFeedbackRepository";
import { reviewsModel } from "../models/reviewsModel";

export class FeedbackRepository implements IFeedbackRepository {
  async getfeedback(lawyerId: Types.ObjectId): Promise<FeedbackEntity | null> {
    return await reviewsModel.findOne({ lawyerId: lawyerId });
  }

  async saveReview(data: FeedbackEntity): Promise<void> {
    await reviewsModel.create(data);
  }

  async addReview(lawyerId: Types.ObjectId, data: Reviews): Promise<void> {
    await reviewsModel.updateOne(
      { lawyerId: lawyerId },
      { $push: { reviews: data } },
    );
  }
}
