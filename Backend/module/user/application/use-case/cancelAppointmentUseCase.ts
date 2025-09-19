import { Types } from "mongoose";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { ICancelAppointmentUseCase } from "../use-case-interface/ICancelAppointmentUseCase";
import { AppException } from "../../../../common/error/errorException";
import { IRefundPayment } from "../../infrastructure/services/IRefundPaymentService";



export class CancelAppointmentUseCase implements ICancelAppointmentUseCase{

    constructor(
        private _appointmentRepo:IAppointmentRepository,
        private _refundPaymentService:IRefundPayment
    ){}

    async execute(appointmentId: Types.ObjectId): Promise<void> {
        try {
            let appointment=await this._appointmentRepo.findAppointmentById(appointmentId)
            let currentDate=new Date().toISOString().split('T')[0]

        if(appointment){
            if(appointment.date>currentDate){
                await this._appointmentRepo.cancelAppointment(appointmentId)
                if(appointment.paymentId){
                    await this._refundPaymentService.execute(appointmentId,appointment.paymentId!)
                }
            }else{
                throw new AppException("Appointment can't cancel Today",403)
            }
        }
        } catch (error) {
            throw error
        }

    }
}