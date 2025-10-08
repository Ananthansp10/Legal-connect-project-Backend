import { IAppointmentRequestDto } from "../../domain/dtos/appointmentDto";

export interface IBookAppointmentUseCase {
  execute(data: IAppointmentRequestDto, caseId: string): Promise<void>;
}
