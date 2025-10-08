import mongoose, { Schema } from "mongoose";
import { IFeedbackEntity } from "../../domain/entity/feedbackEntity";

const reviewSchema = new mongoose.Schema<IFeedbackEntity>({
  lawyerId: {
    type: Schema.Types.ObjectId,
    ref: "lawyer",
    required: true,
  },
  reviews: [
    {
      userName: {
        type: String,
      },
      date: {
        type: String,
      },
      feedback: {
        type: String,
      },
      rating: {
        type: Number,
      },
    },
  ],
});

export const reviewsModel = mongoose.model<IFeedbackEntity>(
  "reviews",
  reviewSchema,
);
