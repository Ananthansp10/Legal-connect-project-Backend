import { Types } from "mongoose";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import {
  IGetTodaysAppointmentsUseCase,
  ITodaysAppointmentResponseDataDto,
} from "../use-case-interface/IGetTodaysAppointmentUseCase";

export class GetTodaysAppointmentsUseCase
  implements IGetTodaysAppointmentsUseCase
{
  constructor(private _appointmentRepo: IAppointmentRepository) {}

  async execute(
    userId: Types.ObjectId,
  ): Promise<ITodaysAppointmentResponseDataDto[] | []> {
    const appointments = await this._appointmentRepo.getTodaysAppointment(
      userId,
      new Date().toISOString().split("T")[0],
    );
    if (!appointments || appointments?.length == 0) {
      return [];
    }
    const appointmentsDetails = await Promise.all(
      appointments?.map(async (appointment) => {
        const lawyerDetails = await this._appointmentRepo.findLawyerDetails(
          appointment.lawyerId,
        );

        return {
          _id: appointment._id ?? new Types.ObjectId(""),
          name: lawyerDetails?.personalInfo.name ?? "",
          profileImage: lawyerDetails?.personalInfo.profileImage ?? "",
          date: appointment.date,
          time: appointment.time,
          mode: appointment.consultationMode,
          specialization:
            lawyerDetails?.proffessionalInfo.practiceAreas[0] ?? "",
        };
      }),
    );

    return appointmentsDetails;
  }
}
