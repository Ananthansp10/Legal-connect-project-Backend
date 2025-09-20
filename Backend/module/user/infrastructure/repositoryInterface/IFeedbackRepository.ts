import { Types } from "mongoose";
import { FeedbackEntity, Reviews } from "../../domain/entity/feedbackEntity";


export interface IFeedbackRepository {
    getfeedback(lawyerId: Types.ObjectId): Promise<FeedbackEntity | null>;
    saveReview(data: FeedbackEntity): Promise<void>;
    addReview(lawyerId: Types.ObjectId, data: Reviews): Promise<void>;

}