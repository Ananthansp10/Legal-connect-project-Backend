import { Types } from "mongoose";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import {
  IAppointmentsData,
  IGetAppointmentUseCase,
} from "../use-case-interface/IGetAppointmentUseCase";

export class GetAppointmentUseCase implements IGetAppointmentUseCase {
  constructor(private _appointmentRepository: IAppointmentRepository) {}

  async execute(
    userId: Types.ObjectId,
    appointmentStatus: string,
    startIndex: number,
    limit: number,
  ): Promise<{
    appointments: IAppointmentsData[];
    totalAppointments: number;
  } | null> {
    const appointments =
      await this._appointmentRepository.findAppointmentByUserId(
        userId,
        appointmentStatus,
        startIndex,
        limit,
      );

    if (!appointments || appointments.appointments.length == 0) return null;

    const appointmentDetails = await Promise.all(
      appointments.appointments.map(async (appointment) => {
        const lawyerDetails =
          await this._appointmentRepository.findLawyerDetails(
            appointment.lawyerId,
          );

        const lawyerData = {
          _id: lawyerDetails?.lawyerId ?? new Types.ObjectId(""),
          name: lawyerDetails?.personalInfo.name ?? "",
          specialization: lawyerDetails?.proffessionalInfo.practiceAreas ?? [],
          profileImage: lawyerDetails?.personalInfo.profileImage ?? "",
          fee: lawyerDetails?.proffessionalInfo.fee ?? "",
        };

        return {
          _id: appointment._id ?? new Types.ObjectId(""),
          lawyer: lawyerData ?? new Types.ObjectId(""),
          date: appointment.date,
          time: appointment.time,
          mode: appointment.consultationMode,
          status: appointment.appointmentStatus,
          payment: appointment?.payment ? appointment.payment : "",
          problem: appointment.problem,
          fee: appointment.fee,
          paymentDate: appointment.paymentDate,
          meetStart: appointment.meetStart,
          note: appointment.notes,
          caseId: appointment.caseId,
        };
      }),
    );

    return {
      appointments: appointmentDetails,
      totalAppointments: appointments.totalAppointments,
    };
  }
}
