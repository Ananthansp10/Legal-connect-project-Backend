import { Types } from "mongoose";
import { IAppointmentEntity } from "../../domain/entity/appointmentEntity";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { AppointmentsData, IGetAppointmentUseCase } from "../use-case-interface/IGetAppointmentUseCase";


export class GetAppointmentUseCase implements IGetAppointmentUseCase{

    constructor(
        private _appointmentRepository:IAppointmentRepository
    ){}

   async execute(userId: Types.ObjectId,appointmentStatus:string): Promise<AppointmentsData[] | null> {
  let appointments = await this._appointmentRepository.findAppointmentByUserId(userId,appointmentStatus);

  if (!appointments) return null;

  let appointmentDetails = await Promise.all(
    appointments.map(async (appointment) => {
      let lawyerDetails = await this._appointmentRepository.findLawyerDetails(appointment.lawyerId);

      let lawyerData = {
        name: lawyerDetails?.personalInfo.name!,
        specialization: lawyerDetails?.proffessionalInfo.practiceAreas!,
        profileImage: lawyerDetails?.personalInfo.profileImage!
      };

      return {
        lawyer: lawyerData!,
        date: appointment.date,
        time: appointment.time,
        mode: appointment.consultationMode,
        status: appointment.appointmentStatus
      };
    })
  );

  return appointmentDetails;
}
}