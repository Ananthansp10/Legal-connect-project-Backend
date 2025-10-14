import mongoose, { Types } from "mongoose";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { IAppointmentResponseDto } from "../use-case-interface/IGetAppointmentUseCase";
import { ISearchAppointmentUseCase } from "../use-case-interface/ISearchAppointmentUseCase";

export class SearchAppointmentUseCase implements ISearchAppointmentUseCase {
  constructor(private _appointmentRepo: IAppointmentRepository) {}

  async execute(
    lawyerId: Types.ObjectId,
    userName: string,
  ): Promise<IAppointmentResponseDto[] | null> {
    const appointments = await this._appointmentRepo.searchAppointment(
      lawyerId,
      userName,
    );
    if (!appointments || appointments.length == 0) {
      return null;
    }
    let result = await Promise.all(
      appointments.map((appointment) => {
        return {
          id: appointment._id,
          problem: appointment.problem,
          date: appointment.date,
          time: appointment.time,
          status: appointment.appointmentStatus,
          mode: appointment.consultationMode,
          payment: appointment.payment ?? "",
          paymentDate: appointment.paymentDate,
          notes: appointment.notes,
          fee: appointment.fee,
          user: {
            _id:
              appointment.userDetails?.userId ??
              new mongoose.Types.ObjectId(""),
            name: appointment.userDetails?.name ?? "",
            profileImage: appointment.userDetails?.profileImage ?? "",
            email: appointment.userDetails?.email ?? "",
            phoneNumber: appointment.userDetails?.phoneNumber ?? "",
            proffession: appointment.userDetails?.proffession ?? "",
          },
          caseId: appointment.caseId,
        };
      }),
    );
    return result;
  }
}
