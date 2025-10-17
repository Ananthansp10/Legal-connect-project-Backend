import { AppException } from "../../../../common/error/errorException";
import { AppointmentStatus } from "../../../../common/status/appointmentStatus";
import { IAppointmentRequestDto } from "../../domain/dtos/appointmentDto";
import { IBookAppointmentRepository } from "../../infrastructure/repositoryInterface/IbookAppointmentRepository";
import { IBookAppointmentUseCase } from "../use-case-interface/IBookAppointmentUseCase";

export class BookAppointmentUseCase implements IBookAppointmentUseCase {
  constructor(private _bookAppointmentRepo: IBookAppointmentRepository) {}

  async execute(data: IAppointmentRequestDto, caseId: string): Promise<void> {
    try {
      const appointmentExist =
        await this._bookAppointmentRepo.findAppointmentExist(
          data.lawyerId,
          data.date,
          data.time,
        );
      if (appointmentExist) {
        throw new AppException("Appointment Already Taken", 403);
      }
      const customCaseId =
        caseId && !isNaN(Number(caseId)) ? parseInt(caseId) : Date.now();
      await this._bookAppointmentRepo.create({
        ...data,
        appointmentStatus: AppointmentStatus.PENDING,
        meetStart: false,
        caseId: customCaseId,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
