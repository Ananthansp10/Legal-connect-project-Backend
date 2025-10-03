import { AppointmentRequestDto } from "../../domain/dtos/appointmentDto";

export interface IBookAppointmentUseCase {
  execute(data: AppointmentRequestDto, caseId: string): Promise<void>;
}
