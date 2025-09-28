import { Types } from "mongoose";
import { IAppointmentEntity } from "../../../user/domain/entity/appointmentEntity";
import { IAppointmentRepository } from "../repositoryInterface/IAppointmentRepository";
import { appointmentModel } from "../../../user/infrastructure/models/appointmentModel";
import { AppointmentStatus } from "../../../../common/status/appointmentStatus";
import { UserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { userProfileModel } from "../../../user/infrastructure/models/userProfileModel";
import { ConsultationHistoryRequestDto } from "../../domain/dtos/consultationHistoryDto";


export class AppointmentRepository implements IAppointmentRepository {

    async getAppointments(lawyerId: Types.ObjectId, appointmentStatus: string, startIndex: number, endIndex: number): Promise<{ appointments: IAppointmentEntity[], totalAppointments: number } | null> {
        let result
        const totalAppointments = await appointmentModel.countDocuments({ lawyerId: lawyerId, appointmentStatus: appointmentStatus })
        if (appointmentStatus == AppointmentStatus.PENDING) {
            result = await appointmentModel.find({ lawyerId: lawyerId, appointmentStatus: AppointmentStatus.PENDING }).skip(startIndex).limit(endIndex)
        } else if (appointmentStatus == AppointmentStatus.ACCEPTED) {
            result = await appointmentModel.find({ lawyerId: lawyerId, appointmentStatus: AppointmentStatus.ACCEPTED }).skip(startIndex).limit(endIndex)
        }
        else if (appointmentStatus == AppointmentStatus.BOOKED) {
            result = await appointmentModel.find({ lawyerId: lawyerId, appointmentStatus: AppointmentStatus.BOOKED }).skip(startIndex).limit(endIndex)
        } else if (appointmentStatus == AppointmentStatus.COMPLETED) {
            result = await appointmentModel.find({ lawyerId: lawyerId, appointmentStatus: AppointmentStatus.COMPLETED }).skip(startIndex).limit(endIndex)
        } else if (appointmentStatus == AppointmentStatus.CANCELLED) {
            result = await appointmentModel.find({ lawyerId: lawyerId, appointmentStatus: AppointmentStatus.CANCELLED }).skip(startIndex).limit(endIndex)
        } else {
            result = await appointmentModel.find({ lawyerId: lawyerId, appointmentStatus: AppointmentStatus.REJECTED }).skip(startIndex).limit(endIndex)
        }

        return { appointments: result, totalAppointments: totalAppointments }
    }

    async findUserDetails(userId: Types.ObjectId): Promise<UserProfileEntitie | null> {
        return await userProfileModel.findOne({ userId: userId })
    }

    async updateStatus(appointmentId: Types.ObjectId, appointmentStatus: string): Promise<void> {
        await appointmentModel.findByIdAndUpdate(appointmentId, { $set: { appointmentStatus: appointmentStatus } })
    }

    async startMeet(appointmentId: Types.ObjectId): Promise<void> {
        await appointmentModel.findByIdAndUpdate(appointmentId, { $set: { meetStart: true } })
    }

    async addNotes(appointmentId: Types.ObjectId, note: string): Promise<void> {
        await appointmentModel.findByIdAndUpdate(appointmentId, { $set: { notes: note } })
    }

    async addFeedback(appointmentId: Types.ObjectId, review: { feedback: string; rating: number; }): Promise<void> {
        await appointmentModel.findByIdAndUpdate(appointmentId, { $set: { feedback: review.feedback, rating: review.rating } })
    }

    async getConsultationHistory(caseId: number): Promise<ConsultationHistoryRequestDto[] | null> {
        const result = await appointmentModel.aggregate([
            {
                $match: {
                    caseId: caseId
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $lookup: {
                    from: "lawyers",
                    localField: "lawyerId",
                    foreignField: "_id",
                    as: "lawyerDetails"
                }
            },
            {
                $unwind:"$userDetails"
            },
            {
                $unwind:"$lawyerDetails"
            }
        ])
        return result
    }
}