import { Types } from "mongoose";
import { IAppointmentEntity } from "../../domain/entity/appointmentEntity";
import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";


export interface IAppointmentRepository{
    findAppointmentByUserId(userId:Types.ObjectId,appointmentStatus:string):Promise<IAppointmentEntity[] | null>;
    findLawyerDetails(lawyerId:Types.ObjectId):Promise<LawyerProfileEntity | null>;
}