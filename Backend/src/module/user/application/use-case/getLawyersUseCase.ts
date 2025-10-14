import { ILawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IGetLawyerRepository } from "../../infrastructure/repositoryInterface/IGetLawyerRepository";
import { IGetLawyerResponse } from "../mapper/getLawyerMapper";
import { GetLawyerMapper } from "../mapper/getLawyerMapper";
import { IGetLawyerUseCase } from "../use-case-interface/IGetLawyersUseCase";

export class GetLawyerUseCase implements IGetLawyerUseCase {
  constructor(private _getLawyerRepo: IGetLawyerRepository) {}

  async execute(): Promise<IGetLawyerResponse[] | null> {
    try {
      const lawyer: ILawyerProfileEntity[] | null =
        await this._getLawyerRepo.findAll();

      let response: IGetLawyerResponse[] = [];

      if (lawyer) {
        response = GetLawyerMapper.toResponse(lawyer);
      }

      return response;
    } catch (error) {
      throw error;
    }
  }
}
