import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IGetLawyerRepository } from "../../interface/repository/getLawyerRepository";
import { GetLawyerMapper, getLawyerResponse } from "../mapper/getLawyerMapper";
import { IFilterLawyerApplication } from "../use-case-interface/IFilterLawyerApplication";



export class FilterLawyerApplication implements IFilterLawyerApplication{

    constructor(
        private _getLawyerProfileRepo:IGetLawyerRepository
    ){}

    async execute(specialization: string): Promise<getLawyerResponse[] | null> {
        let lawyer:LawyerProfileEntity[] | null=await this._getLawyerProfileRepo.getLawyerBySpecialization(specialization)
        let response:getLawyerResponse[]=[]
        if(lawyer){
            response=GetLawyerMapper.toResponse(lawyer)
        }
        return response
    }
}