import { Types } from "mongoose";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { ICancelAppointmentUseCase } from "../use-case-interface/ICancelAppointmentUseCase";
import { AppException } from "../../../../common/error/errorException";



export class CancelAppointmentUseCase implements ICancelAppointmentUseCase{

    constructor(
        private _appointmentRepo:IAppointmentRepository
    ){}

    async execute(appointmentId: Types.ObjectId): Promise<void> {
        try {
            let appointment=await this._appointmentRepo.findAppointmentById(appointmentId)
            let currentDate=new Date().toISOString().split('T')[0]

        if(appointment){
            if(appointment.date>currentDate){
                await this._appointmentRepo.cancelAppointment(appointmentId)
            }else{
                throw new AppException("Appointment can't cancel Today",403)
            }
        }
        } catch (error) {
            throw error
        }

    }
}