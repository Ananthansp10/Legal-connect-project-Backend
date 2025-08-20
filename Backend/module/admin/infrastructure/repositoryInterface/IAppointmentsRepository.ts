import { Types } from "mongoose";
import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IAppointmentEntity } from "../../../user/domain/entity/appointmentEntity";
import { UserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";


export interface IAppointmentsRepository{
    findAppointments(appointmentStatus:string):Promise<IAppointmentEntity[] | null>;
    findUserDetails(userId:Types.ObjectId):Promise<UserProfileEntitie | null>;
    findLawyerDetails(lawyerId:Types.ObjectId):Promise<LawyerProfileEntity | null>;
}