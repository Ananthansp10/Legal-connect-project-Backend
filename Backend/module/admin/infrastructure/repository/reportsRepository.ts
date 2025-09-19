import { UserModel } from "../../../auth/userAuth/infrastructure/models/userSignupModel";
import { subscribersModel } from "../../../lawyer/infrastructure/models/subscribersModel";
import { appointmentModel } from "../../../user/infrastructure/models/appointmentModel";
import { userProfileModel } from "../../../user/infrastructure/models/userProfileModel";
import { LawyerDetailsDto } from "../../domain/dtos/lawyerDetailsDto";
import { SpecializationReportDto } from "../../domain/dtos/specializationReportDto";
import { StateReportDto } from "../../domain/dtos/stateReportDto";
import { planModel } from "../models/planModel";
import { specializationModel } from "../models/specializationModel";
import { IReportsRepository } from "../repositoryInterface/IReportsRepository";



export class ReportsRepository implements IReportsRepository{

    async getTotalRevenue(): Promise<number> {
       let result=await subscribersModel.aggregate([{
         $unwind:"$plans"
       },
       {
        $group:{_id:null,totalRevenue:{$sum:"$plans.price"}}
       }
    ])
    return result[0].totalRevenue
    }

    async getTotalAppointments(): Promise<number> {
        return (await appointmentModel.find()).length
    }

    async getTotalUsers(): Promise<number> {
        return (await UserModel.find()).length
    }

    async getTotalSubscribedLawyers(): Promise<number> {
        return (await subscribersModel.find()).length
    }

    async getSubscriptionPlanReport(): Promise<SpecializationReportDto[] | null> {
        return await subscribersModel.aggregate([{
            $unwind:"$plans"
        },
        {
            $lookup:{
                from:"plans",
                localField:"plans.planId",
                foreignField:"_id",
                as:"planDetails"
            }
        },
        {
            $group:{_id:"$planDetails.name",specializationCount:{$sum:1}}
        }
    ])
    }

    async getStateReport(): Promise<StateReportDto[] | null> {
        return await userProfileModel.aggregate([{
            $group:{_id:"$address.state",usersCount:{$sum:1}}
        }])
    }

    async getLawyerDetails(): Promise<LawyerDetailsDto[] | null> {
        return await subscribersModel.aggregate([
            {
            $lookup: {
                from: "lawyers",
                localField: "lawyerId",
                foreignField: "_id",
                as: "lawyerDetails"
            }
            },
            {
            $lookup: {
                from: "lawyerprofiles",
                localField: "lawyerId",
                foreignField: "lawyerId",
                as: "lawyerProfile"
            }
            },
            {
            $unwind: "$plans"
            },
            {
            $lookup: {
                from: "plans",
                localField: "plans.planId",
                foreignField: "_id",
                as: "planDetails"
            }
            },
            {
            $lookup: {
                from: "appointments",
                localField: "lawyerId",
                foreignField: "lawyerId",
                as: "appointments"
            }
            },
            {
            $addFields: {
                appointmentsCount: { $size: "$appointments" }
            }
            },
            {
            $group: {
                _id: "$lawyerId",
                totalRevenue: { $sum: "$plans.price" },
                totalAppointments: { $sum: "$appointmentsCount" },
                lawyerDetails: { $first: "$lawyerDetails" },
                lawyerProfile: { $first: "$lawyerProfile" },
                planNames: { $addToSet: "$planDetails.name" },
            }
            },
            {
            $project: {
                name: { $arrayElemAt: ["$lawyerDetails.name", 0] },
                specialization: { $arrayElemAt: ["$lawyerProfile.proffessionalInfo.practiceAreas", 0] },
                totalRevenue: 1,
                totalAppointments: 1,
                planName: "$planNames",
                joinDate:{ $arrayElemAt: ["$lawyerDetails.createdAt", 0] }
            }
            }
        ])
    }

}