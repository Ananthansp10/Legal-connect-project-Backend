import { IAppointmentsRepository } from "../../infrastructure/repositoryInterface/IAppointmentsRepository";
import { ISearchAppointmentUseCase } from "../use-case-interface/ISearchAppointmentUseCase";
import { IAppointmentsData } from "../use-case-interface/IGetAppointmentsUseCase";

export class SearchAppointmentUseCase implements ISearchAppointmentUseCase {
  constructor(private _appointmentRepo: IAppointmentsRepository) {}

  async execute(name: string): Promise<IAppointmentsData[] | null> {
    let appointments = await this._appointmentRepo.searchAppointment(name);
    let result;
    if (!appointments || appointments.length == 0) {
      return [];
    } else {
      result = await Promise.all(
        appointments.map((appointment) => {
          return {
            userName: appointment.userDetails.name,
            lawyerName: appointment.lawyerDetails.personalInfo.name,
            userProfileImage: appointment.userDetails.profileImage!,
            lawyerProfileImage:
              appointment.lawyerDetails.personalInfo.profileImage!,
            specialization:
              appointment.lawyerDetails.proffessionalInfo.specialization?.[0],
            date: appointment.date,
            time: appointment.time,
            appointmentStatus: appointment.appointmentStatus,
            problem: appointment.problem,
          };
        }),
      );
    }
    return result;
  }
}
