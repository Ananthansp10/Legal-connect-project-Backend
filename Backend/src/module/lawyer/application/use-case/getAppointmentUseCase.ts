import { Types } from "mongoose";
import {
  IAppointmentResponseDto,
  IGetAppointmentUseCase,
} from "../use-case-interface/IGetAppointmentUseCase";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";

export class GetAppointmentUseCase implements IGetAppointmentUseCase {
  constructor(private _appointmentRepo: IAppointmentRepository) {}

  async execute(
    lawyerId: Types.ObjectId,
    appointmentStatus: string,
    startIndex: number,
    endIndex: number,
  ): Promise<{
    appointments: IAppointmentResponseDto[];
    totalAppointments: number;
  } | null> {
    const appointments =
      (await this._appointmentRepo.getAppointments(
        lawyerId,
        appointmentStatus,
        startIndex,
        endIndex,
      )) || null;
    if (!appointments || appointments?.appointments.length == 0) {
      return null;
    }
    const appointmentDetails = await Promise.all(
      appointments.appointments.map(async (appointment) => {
        const userDetails = await this._appointmentRepo.findUserDetails(
          appointment.userId,
        );
        return {
          _id: appointment._id,
          user: {
            _id: userDetails?.userId ?? new Types.ObjectId(""),
            name: userDetails?.name ?? "",
            profileImage: userDetails?.profileImage ?? "",
            email: userDetails?.email ?? "",
            phoneNumber: userDetails?.phoneNumber ?? "",
            proffession: userDetails?.proffession ?? "",
          },
          problem: appointment.problem,
          date: appointment.date,
          time: appointment.time,
          mode: appointment.consultationMode,
          status: appointment.appointmentStatus,
          payment: appointment.payment || "",
          fee: appointment.fee,
          paymentDate: appointment.paymentDate,
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
