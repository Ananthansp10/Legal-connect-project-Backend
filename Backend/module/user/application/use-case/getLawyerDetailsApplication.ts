import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IGetLawyerRepository } from "../../interface/repository/getLawyerRepository";
import { IGetLawyerDetailsApplication } from "../use-case-interface/IGetLawyerDetailsApplication";



export class GetLawyerDetailsApplication implements IGetLawyerDetailsApplication{

    constructor(
        private _getLawyerDetailsRepo:IGetLawyerRepository
    ){}

    async execute(lawyerId: string): Promise<LawyerProfileEntity | null> {
        return await this._getLawyerDetailsRepo.getLawyerById(lawyerId)
    }
}