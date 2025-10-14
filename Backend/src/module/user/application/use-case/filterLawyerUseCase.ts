import { ILawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IGetLawyerRepository } from "../../infrastructure/repositoryInterface/IGetLawyerRepository";
import { GetLawyerMapper, IGetLawyerResponse } from "../mapper/getLawyerMapper";
import { IFilterLawyerUseCase } from "../use-case-interface/IFilterLawyerUseCase";

export class FilterLawyerUseCase implements IFilterLawyerUseCase {
  constructor(private _getLawyerProfileRepo: IGetLawyerRepository) {}

  async execute(specialization: string): Promise<IGetLawyerResponse[] | null> {
    const lawyer: ILawyerProfileEntity[] | null =
      await this._getLawyerProfileRepo.getLawyerBySpecialization(
        specialization,
      );
    let response: IGetLawyerResponse[] = [];
    if (lawyer) {
      response = GetLawyerMapper.toResponse(lawyer);
    }
    return response;
  }
}
