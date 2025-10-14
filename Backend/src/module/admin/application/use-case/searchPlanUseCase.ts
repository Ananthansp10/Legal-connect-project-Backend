import { IPlansResponseDto } from "../../domain/dtos/plansDto";
import { IPlanManagementRepository } from "../../infrastructure/repositoryInterface/IPlanManagementRepository";
import { ISearchPlanUseCase } from "../use-case-interface/ISearchPlanUseCase";

export class SearchPlanUseCase implements ISearchPlanUseCase {
  constructor(private _planRepo: IPlanManagementRepository) {}

  async execute(planName: string): Promise<IPlansResponseDto[] | null> {
    return await this._planRepo.searchPlan(planName);
  }
}
