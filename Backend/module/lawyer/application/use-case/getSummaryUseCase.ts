import { Types } from "mongoose";
import { SummaryDto } from "../../domain/dtos/summaryDto";
import { ISummaryRepository } from "../../infrastructure/repositoryInterface/ISummaryRepository";
import { IGetSummaryUseCase } from "../use-case-interface/IGetSummaryUseCase";


export class GetSummaryUseCase implements IGetSummaryUseCase {

    constructor(
        private _summaryRepo: ISummaryRepository
    ) { }

    async execute(lawyerId: Types.ObjectId): Promise<SummaryDto | null> {
        return await this._summaryRepo.getSummary(lawyerId)
    }
}