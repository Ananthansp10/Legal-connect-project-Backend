import { Types } from "mongoose";

export interface IReviews {
  userName: string;
  date: string;
  feedback: string;
  rating: number;
}

export interface IFeedbackEntity {
  lawyerId: Types.ObjectId;
  reviews: IReviews[];
}
