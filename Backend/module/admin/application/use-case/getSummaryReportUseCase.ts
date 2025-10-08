import mongoose from "mongoose";
import { SummaryReportDto } from "../../domain/dtos/summaryReportDto";
import { ISummaryReportRepository } from "../../infrastructure/repositoryInterface/ISummaryReportRepository";
import { IGetSummaryReportUseCase } from "../use-case-interface/IGetSummaryReportUseCase";

export class GetSummaryReportUseCase implements IGetSummaryReportUseCase {
  constructor(private _summaryReportRepo: ISummaryReportRepository) {}

  async execute(): Promise<SummaryReportDto> {
    try {
      const totalUsers = (await this._summaryReportRepo.getTotalUsers()) || 0;
      const totalLawyers =
        (await this._summaryReportRepo.getTotalLawyers()) || 0;
      const todaysAppointments =
        (await this._summaryReportRepo.getTodaysAppointments()) || 0;
      const pendingVerification =
        (await this._summaryReportRepo.getTotalUnverifiedLawyers()) || 0;
      const revenueChart =
        (await this._summaryReportRepo.getRevenueChart()) || [];
      const weeklyAppointments =
        await this._summaryReportRepo.getWeeklyAppointments();
      const specializationChart =
        await this._summaryReportRepo.getSpecializationChart();

      const lawyers = await this._summaryReportRepo.getLawyers();
      const topLawyers = await Promise.all(
        (lawyers ?? [])?.map(async (data) => {
          const lawyerProfile = await this._summaryReportRepo.getLawyerProfile(
            new mongoose.Types.ObjectId(data._id),
          );
          const lawyerAppointments =
            await this._summaryReportRepo.getLawyerApppointments(
              new mongoose.Types.ObjectId(data._id),
            );
          const lawyerRating = await this._summaryReportRepo.getLawyerRating(
            new mongoose.Types.ObjectId(data._id),
          );
          return {
            name: lawyerProfile?.personalInfo.name!,
            profileImage: lawyerProfile?.personalInfo.profileImage!,
            specialization: lawyerProfile?.proffessionalInfo.practiceAreas[0]!,
            totalConsultation: lawyerAppointments?.length || 0,
            rating: lawyerRating?.reviews
              ? Math.floor(
                  lawyerRating.reviews.reduce(
                    (acc, rev) => acc + rev.rating,
                    0,
                  ) / lawyerRating.reviews.length,
                )
              : 0,
          };
        }),
      );

      const users = await this._summaryReportRepo.getUsers();
      const topUsers = await Promise.all(
        (users ?? []).map(async (data) => {
          const userProfile = await this._summaryReportRepo.getUserProfile(
            new mongoose.Types.ObjectId(data._id),
          );
          const userAppointments =
            await this._summaryReportRepo.getUserAppointments(
              new mongoose.Types.ObjectId(data._id),
            );
          return {
            name: userProfile?.name!,
            profileImage: userProfile?.profileImage!,
            country: userProfile?.address.country!,
            state: userProfile?.address.state!,
            totalConsultation: userAppointments?.length || 0,
          };
        }),
      );

      const stateChart = await this._summaryReportRepo.getStateChart();
      const countryChart = await this._summaryReportRepo.getCountryChart();

      return {
        totalUsers,
        totalLawyers,
        todaysAppointments,
        pendingVerification,
        revenueChart,
        weeklyAppointments:
          weeklyAppointments?.map((appointments) => {
            return {
              dayName: appointments.dayName,
              appointmentsCount: appointments.appointmentsCount,
            };
          }) || [],
        specializationChart:
          specializationChart?.[0].specializations.map((data) => {
            return {
              specializationName: data._id,
              average: data.count
                ? Math.floor(
                    data.count /
                      specializationChart[0].totalLawyers[0].totalLawyers,
                  ) *
                    100 ==
                  0
                  ? data._id?.length
                  : Math.floor(
                      data.count /
                        specializationChart[0].totalLawyers[0].totalLawyers,
                    ) * 100
                : 0,
            };
          }) || [],
        topLawyers: topLawyers
          .sort((a, b) => b.totalConsultation - a.totalConsultation)
          .slice(0, 3),
        topUsers: topUsers
          .sort((a, b) => b.totalConsultation - a.totalConsultation)
          .slice(0, 3),
        stateChart: stateChart || [],
        countryChart: countryChart || [],
      };
    } catch (error) {
      throw error;
    }
  }
}
