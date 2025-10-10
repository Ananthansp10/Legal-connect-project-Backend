import { Types } from "mongoose";
import { ILawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { lawyerProfileModel } from "../../../lawyer/infrastructure/models/lawyerProfileModel";
import { IAppointmentEntity } from "../../../user/domain/entity/appointmentEntity";
import { IUserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { appointmentModel } from "../../../user/infrastructure/models/appointmentModel";
import { userProfileModel } from "../../../user/infrastructure/models/userProfileModel";
import { IAppointmentsRepository } from "../repositoryInterface/IAppointmentsRepository";
import { IAppointmentDetailsDto } from "../../domain/dtos/appointmentDetailsDto";

export class AppointmentRepository implements IAppointmentsRepository {
  async findAppointments(
    appointmentStatus: string,
    startIndex: number,
    limit: number,
  ): Promise<{
    appointments: IAppointmentEntity[];
    totalAppointments: number;
  } | null> {
    let appointments = await appointmentModel
      .find(
        appointmentStatus != "All"
          ? { appointmentStatus: appointmentStatus }
          : {},
      )
      .skip(startIndex)
      .limit(limit);
    let totalAppointments = await appointmentModel.countDocuments(
      appointmentStatus != "All"
        ? { appointmentStatus: appointmentStatus }
        : {},
    );
    return { appointments, totalAppointments };
  }

  async findUserDetails(
    userId: Types.ObjectId,
  ): Promise<IUserProfileEntitie | null> {
    return await userProfileModel.findOne({ userId: userId });
  }

  async findLawyerDetails(
    lawyerId: Types.ObjectId,
  ): Promise<ILawyerProfileEntity | null> {
    return await lawyerProfileModel.findOne({ lawyerId: lawyerId });
  }

  async searchAppointment(
    name: string,
  ): Promise<IAppointmentDetailsDto[] | null> {
    return await appointmentModel.aggregate([
      {
        $lookup: {
          from: "userprofiles",
          localField: "userId",
          foreignField: "userId",
          as: "userDetails",
        },
      },
      {
        $lookup: {
          from: "lawyerprofiles",
          localField: "lawyerId",
          foreignField: "lawyerId",
          as: "lawyerDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $unwind: "$lawyerDetails",
      },
      {
        $match: {
          "userDetails.name": name,
        },
      },
    ]);
  }
}
