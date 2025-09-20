import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IGetLawyerRepository } from "../../infrastructure/repositoryInterface/IGetLawyerRepository";
import { GetLawyerMapper, getLawyerResponse } from "../mapper/getLawyerMapper";
import { ISearchLawyerUseCase } from "../use-case-interface/ISearchLawyerUseCase";


export class SearchLawyerUseCase implements ISearchLawyerUseCase {

    constructor(
        private _getLawyerProfileRepo: IGetLawyerRepository
    ) { }

    async execute(name: string): Promise<getLawyerResponse[] | null> {
        const lawyer: LawyerProfileEntity[] | null = await this._getLawyerProfileRepo.getLawyerByName(name)
        let response: getLawyerResponse[] = []
        if (lawyer) {
            response = GetLawyerMapper.toResponse(lawyer)
        }
        return response
    }
}