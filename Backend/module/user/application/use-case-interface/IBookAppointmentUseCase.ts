import { IAppointmentEntity } from "../../domain/entity/appointmentEntity";



export interface IBookAppointmentUseCase{
    execute(data:IAppointmentEntity):Promise<void>;
}