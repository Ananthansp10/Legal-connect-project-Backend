import { Types } from "mongoose";
import { IAppointmentEntity } from "../../domain/entity/appointmentEntity";
import { IBaseRepository } from "./IbaseRepository";


export interface IBookAppointmentRepository extends IBaseRepository<IAppointmentEntity>{
}