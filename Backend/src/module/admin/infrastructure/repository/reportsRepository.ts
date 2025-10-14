import { userModel } from "../../../auth/userAuth/infrastructure/models/userSignupModel";
import { lawyerProfileModel } from "../../../lawyer/infrastructure/models/lawyerProfileModel";
import { subscribersModel } from "../../../lawyer/infrastructure/models/subscribersModel";
import { appointmentModel } from "../../../user/infrastructure/models/appointmentModel";
import { userProfileModel } from "../../../user/infrastructure/models/userProfileModel";
import { ILawyerDetailsDto } from "../../domain/dtos/lawyerDetailsDto";
import { IRevenueDateChartDto } from "../../domain/dtos/revenueDateChartDto";
import { ISpecializationCategoryChartDto } from "../../domain/dtos/specializationCategoryChartDto";
import { ISpecializationReportDto } from "../../domain/dtos/specializationReportDto";
import { IStateReportDto } from "../../domain/dtos/stateReportDto";
import { IReportsRepository } from "../repositoryInterface/IReportsRepository";

export class ReportsRepository implements IReportsRepository {
  async getTotalRevenue(): Promise<number> {
    const result = await subscribersModel.aggregate([
      {
        $unwind: "$plans",
      },
      {
        $group: { _id: null, totalRevenue: { $sum: "$plans.price" } },
      },
    ]);
    return result.length > 0 ? result[0].totalRevenue : 0;
  }

  async getTotalAppointments(): Promise<number> {
    return (await appointmentModel.find()).length;
  }

  async getTotalUsers(): Promise<number> {
    return (await userModel.find()).length;
  }

  async getTotalSubscribedLawyers(): Promise<number> {
    return (await subscribersModel.find()).length;
  }

  async getSubscriptionPlanReport(): Promise<
    ISpecializationReportDto[] | null
  > {
    return await subscribersModel.aggregate([
      {
        $unwind: "$plans",
      },
      {
        $lookup: {
          from: "plans",
          localField: "plans.planId",
          foreignField: "_id",
          as: "planDetails",
        },
      },
      {
        $group: { _id: "$planDetails.name", specializationCount: { $sum: 1 } },
      },
    ]);
  }

  async getStateReport(): Promise<IStateReportDto[] | null> {
    return await userProfileModel.aggregate([
      {
        $group: { _id: "$address.state", usersCount: { $sum: 1 } },
      },
    ]);
  }

  async getLawyerDetails(): Promise<ILawyerDetailsDto[] | null> {
    return await subscribersModel.aggregate([
      {
        $lookup: {
          from: "lawyers",
          localField: "lawyerId",
          foreignField: "_id",
          as: "lawyerDetails",
        },
      },
      {
        $lookup: {
          from: "lawyerprofiles",
          localField: "lawyerId",
          foreignField: "lawyerId",
          as: "lawyerProfile",
        },
      },
      {
        $unwind: "$plans",
      },
      {
        $lookup: {
          from: "plans",
          localField: "plans.planId",
          foreignField: "_id",
          as: "planDetails",
        },
      },
      {
        $lookup: {
          from: "appointments",
          localField: "lawyerId",
          foreignField: "lawyerId",
          as: "appointments",
        },
      },
      {
        $addFields: {
          appointmentsCount: { $size: "$appointments" },
        },
      },
      {
        $group: {
          _id: "$lawyerId",
          totalRevenue: { $sum: "$plans.price" },
          totalAppointments: { $sum: "$appointmentsCount" },
          lawyerDetails: { $first: "$lawyerDetails" },
          lawyerProfile: { $first: "$lawyerProfile" },
          planNames: { $addToSet: "$planDetails.name" },
        },
      },
      {
        $project: {
          name: { $arrayElemAt: ["$lawyerDetails.name", 0] },
          specialization: {
            $arrayElemAt: ["$lawyerProfile.proffessionalInfo.practiceAreas", 0],
          },
          totalRevenue: 1,
          totalAppointments: 1,
          planName: "$planNames",
          joinDate: { $arrayElemAt: ["$lawyerDetails.createdAt", 0] },
        },
      },
    ]);
  }

  async getRevenueDateChart(
    dateRange: string,
  ): Promise<IRevenueDateChartDto[] | null> {
    let result = [];
    if (dateRange == "Daily") {
      result = await subscribersModel.aggregate([
        { $unwind: "$plans" },
        {
          $addFields: {
            planDate: {
              $cond: [
                { $eq: [{ $type: "$plans.date" }, "string"] },
                {
                  $dateFromString: {
                    dateString: "$plans.date",
                    format: "%Y-%m-%d",
                  },
                },
                "$plans.date",
              ],
            },
          },
        },
        {
          $group: {
            _id: {
              day: { $dayOfMonth: "$planDate" },
              month: { $month: "$planDate" },
              year: { $year: "$planDate" },
            },
            totalRevenue: { $sum: "$plans.price" },
          },
        },
      ]);
    }
    if (dateRange == "Weekly") {
      result = await subscribersModel.aggregate([
        { $unwind: "$plans" },
        {
          $group: {
            _id: {
              year: { $year: { $toDate: "$plans.date" } },
              week: { $week: { $toDate: "$plans.date" } },
            },
            totalRevenue: { $sum: "$plans.price" },
          },
        },
        { $sort: { "_id.year": 1, "_id.week": 1 } },
      ]);
    }
    if (dateRange == "Monthly") {
      result = await subscribersModel.aggregate([
        { $unwind: "$plans" },
        {
          $addFields: {
            planDate: { $toDate: "$plans.date" },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$planDate" },
              year: { $year: "$planDate" },
            },
            totalRevenue: { $sum: "$plans.price" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
        {
          $project: {
            _id: 0,
            month: {
              $let: {
                vars: {
                  months: [
                    "",
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                },
                in: { $arrayElemAt: ["$$months", "$_id.month"] },
              },
            },
            year: "$_id.year",
            totalRevenue: 1,
          },
        },
      ]);
    }
    if (dateRange == "Yearly") {
      result = await subscribersModel.aggregate([
        { $unwind: "$plans" },
        {
          $addFields: {
            planDate: { $toDate: "$plans.date" },
          },
        },
        {
          $group: {
            _id: { year: { $year: "$planDate" } },
            totalRevenue: { $sum: "$plans.price" },
          },
        },
        { $sort: { "_id.year": 1 } },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            totalRevenue: 1,
          },
        },
      ]);
    }
    if (dateRange == "All") {
      result = await subscribersModel.aggregate([
        { $unwind: "$plans" },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$plans.price" },
          },
        },
        {
          $project: {
            _id: 0,
            totalRevenue: 1,
          },
        },
      ]);
    }
    return result;
  }

  async getSpecializationChart(
    specializationType: string,
  ): Promise<ISpecializationCategoryChartDto[] | null> {
    let result = [];
    if (specializationType == "All") {
      result = await lawyerProfileModel.aggregate([
        {
          $unwind: "$proffessionalInfo.practiceAreas",
        },
        {
          $group: {
            _id: "$proffessionalInfo.practiceAreas",
            specializationCount: { $sum: 1 },
          },
        },
      ]);
    } else {
      result = await lawyerProfileModel.aggregate([
        {
          $unwind: "$proffessionalInfo.practiceAreas",
        },
        {
          $match: {
            "proffessionalInfo.practiceAreas": specializationType,
          },
        },
        {
          $group: {
            _id: "$proffessionalInfo.practiceAreas",
            specializationCount: { $sum: 1 },
          },
        },
      ]);
    }
    return result;
  }
}
