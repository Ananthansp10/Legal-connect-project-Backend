import { Types } from "mongoose";
import { IAppointmentEntity } from "../../domain/entity/appointmentEntity";
import { IAppointmentRepository } from "../repositoryInterface/IAppointmentRepository";
import { appointmentModel } from "../models/appointmentModel";
import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { lawyerProfileModel } from "../../../lawyer/infrastructure/models/lawyerProfileModel";
import { AppointmentStatus } from "../../../../common/status/appointmentStatus";
import { PaymentStatus } from "../../../../common/status/paymentStatus";


export class AppointmentRepository implements IAppointmentRepository{

    async findAppointmentByUserId(userId: Types.ObjectId,appointmentStatus:string): Promise<IAppointmentEntity[] | null> {
      let result
      if(appointmentStatus==AppointmentStatus.PENDING){
        result=await appointmentModel.find({userId:userId,appointmentStatus:AppointmentStatus.PENDING})
      }else if(appointmentStatus==AppointmentStatus.ACCEPTED){
        result=await appointmentModel.find({userId:userId,appointmentStatus:AppointmentStatus.ACCEPTED})
      }else if(appointmentStatus==AppointmentStatus.COMPLETED){
        result=await appointmentModel.find({userId:userId,appointmentStatus:AppointmentStatus.COMPLETED})
      }else if(appointmentStatus==AppointmentStatus.CANCELLED){
        result=await appointmentModel.find({userId:userId,appointmentStatus:AppointmentStatus.CANCELLED})
      }else if(appointmentStatus==AppointmentStatus.REJECTED){
        result=await appointmentModel.find({userId:userId,appointmentStatus:AppointmentStatus.REJECTED})
      }else if(appointmentStatus==AppointmentStatus.UPCOMING){
        result=await appointmentModel.find({userId:userId,appointmentStatus:AppointmentStatus.BOOKED})
      }

      return result ? result : null
    }

    async findLawyerDetails(lawyerId: Types.ObjectId): Promise<LawyerProfileEntity | null> {
        return await lawyerProfileModel.findOne({lawyerId:lawyerId})
    }

    async updatePayment(appointmentId: Types.ObjectId, status:string): Promise<void> {
      await appointmentModel.findByIdAndUpdate(appointmentId,
        {$set:{payment:status,appointmentStatus:status==PaymentStatus.SUCCESS ? AppointmentStatus.BOOKED : AppointmentStatus.ACCEPTED}}
      )
    }

    async cancelAppointment(appointmentId: Types.ObjectId): Promise<void> {
      await appointmentModel.findByIdAndUpdate(appointmentId,{$set:{appointmentStatus:AppointmentStatus.CANCELLED}})
    }

    async findAppointmentById(appointmentId: Types.ObjectId): Promise< | null> {
      return await appointmentModel.findById(appointmentId)
    }

    async getTodaysAppointment(userId: Types.ObjectId, date:string): Promise<IAppointmentEntity[] | null> {
      return await appointmentModel.find({userId,date:date,appointmentStatus:AppointmentStatus.BOOKED})
    }

    async resheduleAppointment(appointmentId: Types.ObjectId): Promise<void> {
      await appointmentModel.findByIdAndDelete(appointmentId)
    }
}