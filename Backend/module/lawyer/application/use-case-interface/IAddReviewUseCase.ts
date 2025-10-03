import { Types } from "mongoose";

export interface IAddReviewUseCase {
  execute(
    appointmentId: Types.ObjectId,
    feedback: { feedback: string; rating: number },
  ): Promise<void>;
}
