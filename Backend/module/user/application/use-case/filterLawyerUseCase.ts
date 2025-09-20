import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IGetLawyerRepository } from "../../infrastructure/repositoryInterface/IGetLawyerRepository";
import { GetLawyerMapper, getLawyerResponse } from "../mapper/getLawyerMapper";
import { IFilterLawyerUseCase } from "../use-case-interface/IFilterLawyerUseCase";



export class FilterLawyerUseCase implements IFilterLawyerUseCase {

    constructor(
        private _getLawyerProfileRepo: IGetLawyerRepository
    ) { }

    async execute(specialization: string): Promise<getLawyerResponse[] | null> {
        const lawyer: LawyerProfileEntity[] | null = await this._getLawyerProfileRepo.getLawyerBySpecialization(specialization)
        let response: getLawyerResponse[] = []
        if (lawyer) {
            response = GetLawyerMapper.toResponse(lawyer)
        }
        return response
    }
}