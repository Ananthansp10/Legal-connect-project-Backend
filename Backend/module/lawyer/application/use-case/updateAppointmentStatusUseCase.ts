import { Types } from "mongoose";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { IUpdateAppointmentStatus } from "../use-case-interface/IUpdateAppointmentStatusUseCase";


export class UpdateAppointmentStatusUseCase implements IUpdateAppointmentStatus{

    constructor(
        private _appointmentRepo:IAppointmentRepository
    ){}

    async execute(appointmentId: Types.ObjectId, appointmentStatus: string): Promise<void> {
        await this._appointmentRepo.updateStatus(appointmentId,appointmentStatus)
    }
}