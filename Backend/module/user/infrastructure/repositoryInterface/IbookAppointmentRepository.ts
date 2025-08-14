import { IAppointmentEntity } from "../../domain/entity/appointmentModel";
import { IBaseRepository } from "./IbaseRepository";


export interface IBookAppointmentRepository extends IBaseRepository<IAppointmentEntity>{
}