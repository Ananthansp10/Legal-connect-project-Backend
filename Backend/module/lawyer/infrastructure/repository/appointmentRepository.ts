import { Types } from "mongoose";
import { IAppointmentEntity } from "../../../user/domain/entity/appointmentEntity";
import { IAppointmentRepository } from "../repositoryInterface/IAppointmentRepository";
import { appointmentModel } from "../../../user/infrastructure/models/appointmentModel";
import { AppointmentStatus } from "../../../../common/status/appointmentStatus";
import { UserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { userProfileModel } from "../../../user/infrastructure/models/userProfileModel";


export class AppointmentRepository implements IAppointmentRepository{

    async getAppointments(lawyerId: Types.ObjectId, appointmentStatus: string): Promise<IAppointmentEntity[] | null> {
        let result
        if(appointmentStatus==AppointmentStatus.PENDING){
           result=await appointmentModel.find({lawyerId:lawyerId,appointmentStatus:AppointmentStatus.PENDING})
        }else if(appointmentStatus==AppointmentStatus.ACCEPTED){
            result=await appointmentModel.find({lawyerId:lawyerId,appointmentStatus:AppointmentStatus.ACCEPTED})
        }
        else if(appointmentStatus==AppointmentStatus.BOOKED){
            result=await appointmentModel.find({lawyerId:lawyerId,appointmentStatus:AppointmentStatus.BOOKED})
        }else if(appointmentStatus==AppointmentStatus.COMPLETED){
            result=await appointmentModel.find({lawyerId:lawyerId,appointmentStatus:AppointmentStatus.COMPLETED})
        }else if(appointmentStatus==AppointmentStatus.CANCELLED){
            result=await appointmentModel.find({lawyerId:lawyerId,appointmentStatus:AppointmentStatus.CANCELLED})
        }else{
            result=await appointmentModel.find({lawyerId:lawyerId,appointmentStatus:AppointmentStatus.REJECTED})
        }

        return result
    }

    async findUserDetails(userId: Types.ObjectId): Promise<UserProfileEntitie | null> {
        return await userProfileModel.findOne({userId:userId})
    }

    async updateStatus(appointmentId: Types.ObjectId, appointmentStatus: string): Promise<void> {
        await appointmentModel.findByIdAndUpdate(appointmentId,{$set:{appointmentStatus:appointmentStatus}})
    }
}