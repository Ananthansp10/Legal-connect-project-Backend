import { Types } from "mongoose";
import { IAppointmentEntity } from "../../../user/domain/entity/appointmentEntity";
import { UserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";


export interface IAppointmentRepository{
    getAppointments(lawyerId:Types.ObjectId,appointmentStatus:string):Promise<IAppointmentEntity[] | null>;
    findUserDetails(userId:Types.ObjectId):Promise<UserProfileEntitie | null>;
    updateStatus(appointmentId:Types.ObjectId,appointmentStatus:string):Promise<void>;
}