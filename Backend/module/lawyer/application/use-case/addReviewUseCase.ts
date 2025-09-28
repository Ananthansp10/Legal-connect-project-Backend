import { Types } from "mongoose";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { IAddReviewUseCase } from "../use-case-interface/IAddReviewUseCase";


export class AddReviewUseCase implements IAddReviewUseCase {

    constructor(
        private _appointmentRepo: IAppointmentRepository
    ) { }

    async execute(appointmentId: Types.ObjectId, feedback: { feedback: string; rating: number; }): Promise<void> {
        await this._appointmentRepo.addFeedback(appointmentId, feedback)
    }
}