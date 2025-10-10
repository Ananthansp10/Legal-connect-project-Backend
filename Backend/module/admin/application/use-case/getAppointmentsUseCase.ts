import { IAppointmentsRepository } from "../../infrastructure/repositoryInterface/IAppointmentsRepository";
import {
  IAppointmentsData,
  IGetAppointmentsUseCase,
} from "../use-case-interface/IGetAppointmentsUseCase";

export class GetAppointmentsUseCase implements IGetAppointmentsUseCase {
  constructor(private _appointmentRepo: IAppointmentsRepository) {}

  async execute(
    appointmentStatus: string,
    startIndex: number,
    limit: number,
  ): Promise<
    { appointments: IAppointmentsData[] | []; totalAppointments: number } | []
  > {
    const appointments = await this._appointmentRepo.findAppointments(
      appointmentStatus,
      startIndex,
      limit,
    );
    if (!appointments?.appointments || appointments.appointments.length == 0) {
      return [];
    }
    let appointmentsDetails = await Promise.all(
      appointments.appointments?.map(async (appointment) => {
        const userDetails = await this._appointmentRepo.findUserDetails(
          appointment.userId,
        );
        const lawyerDetails = await this._appointmentRepo.findLawyerDetails(
          appointment.lawyerId,
        );

        return {
          userName: userDetails?.name ?? "",
          lawyerName: lawyerDetails?.personalInfo.name ?? "",
          problem: appointment.problem,
          specialization:
            lawyerDetails?.proffessionalInfo.practiceAreas[0] ?? "",
          date: appointment.date,
          time: appointment.time,
          appointmentStatus: appointment.appointmentStatus,
          userProfileImage: userDetails?.profileImage ?? "",
          lawyerProfileImage: lawyerDetails?.personalInfo.profileImage ?? "",
        };
      }),
    );

    return {
      appointments: appointmentsDetails || [],
      totalAppointments: appointments.totalAppointments,
    };
  }
}
