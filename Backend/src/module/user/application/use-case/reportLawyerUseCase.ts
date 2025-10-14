import {
  IReportRepository,
  IReportDataRequestDto,
} from "../../infrastructure/repositoryInterface/IReportReposiitory";
import { IReportLawyerUseCase } from "../use-case-interface/IReportLawyerUseCase";

export class ReportLawyerUseCase implements IReportLawyerUseCase {
  constructor(private _reportRepo: IReportRepository) {}

  async execute(data: IReportDataRequestDto): Promise<void> {
    const findLawyerReport = await this._reportRepo.findLawyerReportExist(
      data.reportedId,
    );
    if (findLawyerReport) {
      const dataObj = {
        reason: data.reason,
        description: data.description,
        reporterId: data.reporterId,
        date: new Date().toLocaleString(),
      };
      await this._reportRepo.updateLawyerReport(data.reportedId, dataObj);
    } else {
      const reportObj = {
        reportedId: data.reportedId,
        userType: data.userType,
        reports: [
          {
            reason: data.reason,
            description: data.description,
            reporterId: data.reporterId,
            date: new Date().toLocaleString(),
          },
        ],
        status: "Pending",
      };
      await this._reportRepo.reportLawyer(reportObj);
    }
  }
}
