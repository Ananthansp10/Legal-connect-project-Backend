import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IGetLawyerRepository } from "../../infrastructure/repositoryInterface/IGetLawyerRepository";
import { IGetLawyerDetailsUseCase } from "../use-case-interface/IGetLawyerDetailsUseCase";



export class GetLawyerDetailsUseCase implements IGetLawyerDetailsUseCase{

    constructor(
        private _getLawyerDetailsRepo:IGetLawyerRepository
    ){}

    async execute(lawyerId: string): Promise<LawyerProfileEntity | null> {
        return await this._getLawyerDetailsRepo.getLawyerById(lawyerId)
    }
}