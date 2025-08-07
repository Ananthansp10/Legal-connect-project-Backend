import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IGetLawyerRepository } from "../../interface/repository/getLawyerRepository";
import { GetLawyerMapper, getLawyerResponse } from "../mapper/getLawyerMapper";
import { ISearchLawyerApplication } from "../use-case-interface/ISearchLawyerApplication";


export class SearchLawyerApplication implements ISearchLawyerApplication{

    constructor(
        private _getLawyerProfileRepo:IGetLawyerRepository
    ){}

    async execute(name: string): Promise<getLawyerResponse[] | null> {
        let lawyer:LawyerProfileEntity[] | null= await this._getLawyerProfileRepo.getLawyerByName(name)
        let response:getLawyerResponse[]=[]
        if(lawyer){
            response=GetLawyerMapper.toResponse(lawyer)
        }
        return response
    }
}