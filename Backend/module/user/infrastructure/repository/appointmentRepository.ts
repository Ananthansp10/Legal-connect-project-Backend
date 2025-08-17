import { Types } from "mongoose";
import { IAppointmentEntity } from "../../domain/entity/appointmentEntity";
import { IAppointmentRepository } from "../repositoryInterface/IAppointmentRepository";
import { appointmentModel } from "../models/appointmentModel";
import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { lawyerProfileModel } from "../../../lawyer/infrastructure/models/lawyerProfileModel";


export class AppointmentRepository implements IAppointmentRepository{

    async findAppointmentByUserId(userId: Types.ObjectId,appointmentStatus:string): Promise<IAppointmentEntity[] | null> {
      return appointmentStatus=="upcoming" ? await appointmentModel.find({userId:userId,appointmentStatus:{$ne:"completed"}}) : await appointmentModel.find({userId:userId,appointmentStatus:"completed"})
    }

    async findLawyerDetails(lawyerId: Types.ObjectId): Promise<LawyerProfileEntity | null> {
        return await lawyerProfileModel.findOne({lawyerId:lawyerId})
    }
}