import { Types } from "mongoose";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { IUpdateAppointmentStatus } from "../use-case-interface/IUpdateAppointmentStatusUseCase";
import { IPlanRepository } from "../../infrastructure/repositoryInterface/IPlanRepository";
import { AppException } from "../../../../common/error/errorException";

export class UpdateAppointmentStatusUseCase implements IUpdateAppointmentStatus{

    constructor(
        private _appointmentRepo:IAppointmentRepository,
        private _planRepo:IPlanRepository
    ){}

    async execute(appointmentId: Types.ObjectId, appointmentStatus: string, lawyerId:Types.ObjectId): Promise<void> {
        if(appointmentStatus=='Accepted'){
            const subscribed=await this._planRepo.findPlan(lawyerId)
            if(!subscribed){
                throw new AppException("Cant accept ! please subscribe to continue",403)
            }else{
                await this._appointmentRepo.updateStatus(appointmentId,appointmentStatus)
            }
        }else{
            await this._appointmentRepo.updateStatus(appointmentId,appointmentStatus)
        }
    }
}