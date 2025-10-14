import { Types } from "mongoose";
import { ILawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IAppointmentEntity } from "../../../user/domain/entity/appointmentEntity";
import { IUserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { IAppointmentDetailsDto } from "../../domain/dtos/appointmentDetailsDto";

export interface IAppointmentsRepository {
  findAppointments(
    appointmentStatus: string,
    startIndex: number,
    limit: number,
  ): Promise<{
    appointments: IAppointmentEntity[];
    totalAppointments: number;
  } | null>;
  findUserDetails(userId: Types.ObjectId): Promise<IUserProfileEntitie | null>;
  findLawyerDetails(
    lawyerId: Types.ObjectId,
  ): Promise<ILawyerProfileEntity | null>;
  searchAppointment(name: string): Promise<IAppointmentDetailsDto[] | null>;
}
