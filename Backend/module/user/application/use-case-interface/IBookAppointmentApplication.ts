import { IAppointmentEntity } from "../../domain/entity/appointmentModel";



export interface IBookAppointmentApplication{
    execute(data:IAppointmentEntity):Promise<void>;
}