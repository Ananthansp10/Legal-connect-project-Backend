import { Types } from "mongoose";
import { ISlotAvailablityEntity } from "../../../lawyer/domain/entity/slotAvailablityEntity";
import { ISlotResponseDto } from "../../domain/dtos/slotResponseDto";
import { IAppointmentEntity } from "../../domain/entity/appointmentEntity";

export interface IGetLawyerSlotRepository{
    findSlot(lawyerId:Types.ObjectId,date:string):Promise<ISlotAvailablityEntity[]>;
    findAppointmentSlot(lawyerId:Types.ObjectId,date:string,time:string):Promise<IAppointmentEntity | null>;
}