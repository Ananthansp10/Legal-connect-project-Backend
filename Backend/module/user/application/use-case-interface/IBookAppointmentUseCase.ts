import { AppointmentRequestDto } from "../../domain/dtos/appointmentDto";



export interface IBookAppointmentUseCase {
    execute(data: AppointmentRequestDto): Promise<void>;
}