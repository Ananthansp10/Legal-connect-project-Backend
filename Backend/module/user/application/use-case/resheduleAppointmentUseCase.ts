import { Types } from "mongoose";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { IResheduleAppointmentUseCase } from "../use-case-interface/IResheduleAppointmentUseCase";


export class ResheduleAppointmentUseCase implements IResheduleAppointmentUseCase{

    constructor(
        private appointmentRepo:IAppointmentRepository
    ){}

    async execute(appointmentId: Types.ObjectId): Promise<void> {
        await this.appointmentRepo.resheduleAppointment(appointmentId)
    }
}