import { Types } from "mongoose";
import { LawyerModel } from "../../../auth/lawyerAuth/infrastructure/models/lawyerModel";
import { UserModel } from "../../../auth/userAuth/infrastructure/models/userSignupModel";
import { IAppointmentEntity } from "../../../user/domain/entity/appointmentEntity";
import { appointmentModel } from "../../../user/infrastructure/models/appointmentModel";
import { RevenueChartDto } from "../../domain/dtos/revenueChartDto";
import { SpecializationChartDto } from "../../domain/dtos/specializationChartDto";
import { WeeklyAppointmentsDto } from "../../domain/dtos/weeklyAppointmentDto";
import { ISummaryReportRepository } from "../repositoryInterface/ISummaryReportRepository";
import { lawyerProfileModel } from "../../../lawyer/infrastructure/models/lawyerProfileModel";
import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { ILawyerSignup } from "../../../auth/lawyerAuth/domain/entity/lawyerEntity";
import { reviewsModel } from "../../../user/infrastructure/models/reviewsModel";
import { FeedbackEntity } from "../../../user/domain/entity/feedbackEntity";
import { IUserSignup } from "../../../auth/userAuth/domain/userRegisterEntity";
import { userProfileModel } from "../../../user/infrastructure/models/userProfileModel";
import { UserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { StateChartDto } from "../../domain/dtos/stateChartDto";
import { CountryChartDto } from "../../domain/dtos/countryChartDto";
import { subscribersModel } from "../../../lawyer/infrastructure/models/subscribersModel";

export class SummaryReportRepository implements ISummaryReportRepository {

    async getTotalUsers(): Promise<number | null> {
        return (await UserModel.find()).length
    }

    async getTotalLawyers(): Promise<number | null> {
        return (await LawyerModel.find()).length
    }

    async getTodaysAppointments(): Promise<number | null> {
        const currentDate = new Date().toISOString().split('T')[0]
        return (await appointmentModel.find({ date: currentDate })).length
    }

    async getTotalUnverifiedLawyers(): Promise<number | null> {
        return (await LawyerModel.find({ verified: false })).length
    }

    async getRevenueChart(): Promise<RevenueChartDto[] | null> {
        return await subscribersModel.aggregate([{
            $unwind: "$plans"
        },
        {
            $group: {
                _id: { month: { $month: { $dateFromString: { dateString: "$plans.date" } } }, year: { $year: { $dateFromString: { dateString: "$plans.date" } } } },
                revenue: { $sum: "$plans.price" }
            }
        }
        ])
    }

    async getWeeklyAppointments(): Promise<WeeklyAppointmentsDto[] | null> {
        const startOfMonth = new Date()
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0)

        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1)
        endOfMonth.setHours(0, 0, 0, 0)

        const startDateISO = startOfMonth.toISOString()
        const endDateISO = endOfMonth.toISOString()

        return await appointmentModel.aggregate([
            {
                $match: {
                    appointmentStatus: "Booked",
                    date: { $gte: startDateISO, $lt: endDateISO }
                }
            },
            {
                $addFields: {
                    parsedDate: {
                        $dateFromString: {
                            dateString: "$date",
                            format: "%Y-%m-%d"
                        }
                    }
                }
            },
            {
                $addFields: {
                    weekStart: {
                        $dateSubtract: {
                            startDate: "$parsedDate",
                            unit: "day",
                            amount: { $subtract: [{ $dayOfWeek: "$parsedDate" }, 1] }
                        }
                    }
                }
            },
            {
                $group: {
                    _id: { dayOfWeek: { $dayOfWeek: "$parsedDate" } },
                    appointmentsCount: { $sum: 1 }
                }
            },
            {
                $addFields: {
                    dayName: {
                        $arrayElemAt: [
                            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                            { $subtract: ["$_id.dayOfWeek", 1] }
                        ]
                    }
                }
            }
        ]);
    }

    async getSpecializationChart(): Promise<SpecializationChartDto[] | null> {
        return await LawyerModel.aggregate([{
            $facet: {
                totalLawyers: [{ $count: "totalLawyers" }],
                specializations: [{ $unwind: "$specialization" }, { $group: { _id: "$specialization", count: { $sum: 1 } } }]
            }
        }])
    }

    async getLawyerProfile(lawyerId: Types.ObjectId): Promise<LawyerProfileEntity | null> {
        return await lawyerProfileModel.findOne({ lawyerId: lawyerId })
    }

    async getLawyerApppointments(lawyerId: Types.ObjectId): Promise<IAppointmentEntity[] | null> {
        return await appointmentModel.find({ lawyerId: lawyerId })
    }

    async getLawyers(): Promise<ILawyerSignup[] | null> {
        return await LawyerModel.find()
    }

    async getLawyerRating(lawyerId: Types.ObjectId): Promise<FeedbackEntity | null> {
        return await reviewsModel.findOne({ lawyerId: lawyerId })
    }

    async getUsers(): Promise<IUserSignup[] | null> {
        return await UserModel.find()
    }

    async getUserProfile(userId: Types.ObjectId): Promise<UserProfileEntitie | null> {
        return await userProfileModel.findOne({ userId: userId })
    }

    async getUserAppointments(userId: Types.ObjectId): Promise<IAppointmentEntity[] | null> {
        return await appointmentModel.find({ userId: userId })
    }

    async getStateChart(): Promise<StateChartDto[] | null> {
        return await appointmentModel.aggregate([{
            $lookup: {
                from: "userprofiles",
                localField: "userId",
                foreignField: "userId",
                as: "userDetails"
            }
        },
        {
            $unwind: "$userDetails"
        },
        {
            $unwind: "$userDetails.address"
        },
        {
            $group: { _id: "$userDetails.address.state", consultations: { $sum: 1 } }
        }
        ])
    }

    async getCountryChart(): Promise<CountryChartDto[] | null> {
        return await appointmentModel.aggregate([{
            $lookup: {
                from: "userprofiles",
                localField: "userId",
                foreignField: "userId",
                as: "userDetails"
            }
        },
        {
            $unwind: "$userDetails"
        },
        {
            $group: { _id: "$userDetails.address.country", consultations: { $sum: 1 } }
        }
        ])
    }
}