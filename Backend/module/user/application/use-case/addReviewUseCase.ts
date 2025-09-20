import { Types } from "mongoose";
import { Reviews } from "../../domain/entity/feedbackEntity";
import { IFeedbackRepository } from "../../infrastructure/repositoryInterface/IFeedbackRepository";
import { IAddReviewUseCase } from "../use-case-interface/IAddReviewUseCase";


export class AddReviewUseCase implements IAddReviewUseCase {

    constructor(
        private _feedbackRepo: IFeedbackRepository
    ) { }

    async execute(lawyerId: Types.ObjectId, data: Reviews): Promise<void> {
        const reviewExist = await this._feedbackRepo.getfeedback(lawyerId)
        if (reviewExist) {
            await this._feedbackRepo.addReview(lawyerId, data)
        } else {
            const reviewObj = {
                lawyerId: lawyerId,
                reviews: [data]
            }
            await this._feedbackRepo.saveReview(reviewObj)
        }
    }
}