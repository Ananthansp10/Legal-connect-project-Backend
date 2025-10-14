import { ILawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IGetLawyerRepository } from "../../infrastructure/repositoryInterface/IGetLawyerRepository";
import { GetLawyerMapper, IGetLawyerResponse } from "../mapper/getLawyerMapper";
import { ISearchLawyerUseCase } from "../use-case-interface/ISearchLawyerUseCase";

export class SearchLawyerUseCase implements ISearchLawyerUseCase {
  constructor(private _getLawyerProfileRepo: IGetLawyerRepository) {}

  async execute(name: string): Promise<IGetLawyerResponse[] | null> {
    const lawyer: ILawyerProfileEntity[] | null =
      await this._getLawyerProfileRepo.getLawyerByName(name);
    let response: IGetLawyerResponse[] = [];
    if (lawyer) {
      response = GetLawyerMapper.toResponse(lawyer);
    }
    return response;
  }
}
