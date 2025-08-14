import { IAppointmentEntity } from "../../domain/entity/appointmentModel";



export interface IBookAppointmentUseCase{
    execute(data:IAppointmentEntity):Promise<void>;
}