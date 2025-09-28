import { Types } from "mongoose";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { IUpdateAppointmentStatus } from "../use-case-interface/IUpdateAppointmentStatusUseCase";
import { IPlanRepository } from "../../infrastructure/repositoryInterface/IPlanRepository";
import { AppException } from "../../../../common/error/errorException";
import { IBankDetailsRepository } from "../../infrastructure/repositoryInterface/IBankDetailsRepository";

export class UpdateAppointmentStatusUseCase implements IUpdateAppointmentStatus {

    constructor(
        private _appointmentRepo: IAppointmentRepository,
        private _planRepo: IPlanRepository,
        private _bankRepo: IBankDetailsRepository
    ) { }

    async execute(appointmentId: Types.ObjectId, appointmentStatus: string, lawyerId: Types.ObjectId): Promise<void> {
        if (appointmentStatus == 'Accepted') {
            const subscribed = await this._planRepo.findPlan(lawyerId)
            if (!subscribed) {
                throw new AppException("Cant accept ! please subscribe to continue", 403)
            } else {
                const isBankDetailsExist = await this._bankRepo.findBankDetails(lawyerId)
                if(!isBankDetailsExist){
                    throw new AppException("First add your bank details for accepting the appointment", 403)
                }
                await this._appointmentRepo.updateStatus(appointmentId, appointmentStatus)
            }
        } else {
            await this._appointmentRepo.updateStatus(appointmentId, appointmentStatus)
        }
    }
}