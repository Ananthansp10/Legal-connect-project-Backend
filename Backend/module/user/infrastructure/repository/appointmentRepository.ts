import { Types } from "mongoose";
import { IAppointmentEntity } from "../../domain/entity/appointmentEntity";
import { IAppointmentRepository } from "../repositoryInterface/IAppointmentRepository";
import { appointmentModel } from "../models/appointmentModel";
import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { lawyerProfileModel } from "../../../lawyer/infrastructure/models/lawyerProfileModel";
import { AppointmentStatus } from "../../../../common/status/appointmentStatus";
import { PaymentStatus } from "../../../../common/status/paymentStatus";


export class AppointmentRepository implements IAppointmentRepository{

    async findAppointmentByUserId(userId: Types.ObjectId,appointmentStatus:string,startIndex:number,limit:number): Promise<{appointments:IAppointmentEntity[],totalAppointments:number} | null> {
      let result
      let totalAppointments=await appointmentModel.countDocuments({userId:userId,appointmentStatus:appointmentStatus})
      if(appointmentStatus==AppointmentStatus.PENDING){
        result=await appointmentModel.find({userId:userId,appointmentStatus:AppointmentStatus.PENDING}).skip(startIndex).limit(limit)
      }else if(appointmentStatus==AppointmentStatus.ACCEPTED){
        result=await appointmentModel.find({userId:userId,appointmentStatus:AppointmentStatus.ACCEPTED}).skip(startIndex).limit(limit)
      }else if(appointmentStatus==AppointmentStatus.COMPLETED){
        result=await appointmentModel.find({userId:userId,appointmentStatus:AppointmentStatus.COMPLETED}).skip(startIndex).limit(limit)
      }else if(appointmentStatus==AppointmentStatus.CANCELLED){
        result=await appointmentModel.find({userId:userId,appointmentStatus:AppointmentStatus.CANCELLED}).skip(startIndex).limit(limit)
      }else if(appointmentStatus==AppointmentStatus.REJECTED){
        result=await appointmentModel.find({userId:userId,appointmentStatus:AppointmentStatus.REJECTED}).skip(startIndex).limit(limit)
      }else if(appointmentStatus==AppointmentStatus.UPCOMING){
        result=await appointmentModel.find({userId:userId,appointmentStatus:AppointmentStatus.BOOKED}).skip(startIndex).limit(limit)
      }

      return result ? {appointments:result,totalAppointments:totalAppointments} : null
    }

    async findLawyerDetails(lawyerId: Types.ObjectId): Promise<LawyerProfileEntity | null> {
        return await lawyerProfileModel.findOne({lawyerId:lawyerId})
    }

    async updatePayment(appointmentId: Types.ObjectId, status:string, paymentId:string): Promise<void> {
      let currentDate=new Date().toISOString().split('T')[0]
      await appointmentModel.findByIdAndUpdate(appointmentId,
        {$set:{paymentDate:currentDate,payment:status,appointmentStatus:status==PaymentStatus.SUCCESS ? AppointmentStatus.BOOKED : AppointmentStatus.ACCEPTED,paymentId:paymentId}}
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

    async refundPayment(appointmentId: Types.ObjectId, status:string): Promise<void> {
      await appointmentModel.findByIdAndUpdate(appointmentId,{$set:{refundStatus:status}})
    }
}