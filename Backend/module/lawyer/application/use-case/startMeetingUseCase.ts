import { Types } from "mongoose";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { IStartMeetingUseCase } from "../use-case-interface/IStartMeetingUseCase";


export class StartMeetingUseCase implements IStartMeetingUseCase {

    constructor(
        private _appointmentRepo: IAppointmentRepository
    ){}

    async execute(appointmentId: Types.ObjectId): Promise<void> {
        await this._appointmentRepo.startMeet(appointmentId)
    }
}