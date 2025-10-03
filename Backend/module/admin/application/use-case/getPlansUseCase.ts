import { PlansResponseDto } from "../../domain/dtos/plansDto";
import { IPlanManagementRepository } from "../../infrastructure/repositoryInterface/IPlanManagementRepository";
import { IGetPlansUseCase } from "../use-case-interface/IGetPlansUseCase";

export class GetPlansUseCase implements IGetPlansUseCase {
  constructor(private _planManagementRepository: IPlanManagementRepository) {}

  async execute(): Promise<PlansResponseDto[] | null> {
    return await this._planManagementRepository.getPlans();
  }
}
