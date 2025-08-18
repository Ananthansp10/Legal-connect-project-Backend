import { Types } from "mongoose";
import { IAppointmentEntity } from "../../domain/entity/appointmentEntity";
import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";


export interface IAppointmentRepository{
    findAppointmentByUserId(userId:Types.ObjectId,appointmentStatus:string):Promise<IAppointmentEntity[] | null>;
    findLawyerDetails(lawyerId:Types.ObjectId):Promise<LawyerProfileEntity | null>;
    updatePayment(appointmentId:Types.ObjectId,status:string):Promise<void>;
    cancelAppointment(appointmentId:Types.ObjectId):Promise<void>;
    findAppointmentById(appointmentId:Types.ObjectId):Promise<IAppointmentEntity | null>;
    getTodaysAppointment(userId:Types.ObjectId,date:string):Promise<IAppointmentEntity[] | null>;
    resheduleAppointment(appointmentId:Types.ObjectId):Promise<void>;
}