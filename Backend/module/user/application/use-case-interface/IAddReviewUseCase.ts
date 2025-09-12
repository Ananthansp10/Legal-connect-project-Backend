import { Types } from "mongoose";
import { Reviews } from "../../domain/entity/feedbackEntity";


export interface IAddReviewUseCase{
    execute(lawyerId:Types.ObjectId,data:Reviews):Promise<void>;
}