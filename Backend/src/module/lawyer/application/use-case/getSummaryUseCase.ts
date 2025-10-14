import { Types } from "mongoose";
import { ISummaryDto } from "../../domain/dtos/summaryDto";
import { ISummaryRepository } from "../../infrastructure/repositoryInterface/ISummaryRepository";
import { IGetSummaryUseCase } from "../use-case-interface/IGetSummaryUseCase";

export class GetSummaryUseCase implements IGetSummaryUseCase {
  constructor(private _summaryRepo: ISummaryRepository) {}

  async execute(lawyerId: Types.ObjectId): Promise<ISummaryDto | null> {
    return await this._summaryRepo.getSummary(lawyerId);
  }
}
