import { Types } from "mongoose";
import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { lawyerProfileModel } from "../../../lawyer/infrastructure/models/lawyerProfileModel";
import { IAppointmentEntity } from "../../../user/domain/entity/appointmentEntity";
import { UserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { appointmentModel } from "../../../user/infrastructure/models/appointmentModel";
import { userProfileModel } from "../../../user/infrastructure/models/userProfileModel";
import { IAppointmentsRepository } from "../repositoryInterface/IAppointmentsRepository";



export class AppointmentRepository implements IAppointmentsRepository {

    async findAppointments(appointmentStatus: string): Promise<IAppointmentEntity[] | null> {
        return await appointmentModel.find(appointmentStatus != 'All' ? { appointmentStatus: appointmentStatus } : {})
    }

    async findUserDetails(userId: Types.ObjectId): Promise<UserProfileEntitie | null> {
        return await userProfileModel.findOne({ userId: userId })
    }

    async findLawyerDetails(lawyerId: Types.ObjectId): Promise<LawyerProfileEntity | null> {
        return await lawyerProfileModel.findOne({ lawyerId: lawyerId })
    }
}