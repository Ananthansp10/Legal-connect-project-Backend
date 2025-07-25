import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IGetLawyerRepositorie } from "../../interface/repositorie/getLawyerRepositorie";
import { getLawyerResponse } from "../mapper/getLawyerMapper";
import { GetLawyerMapper } from "../mapper/getLawyerMapper";
import { IGetLawyerApplication } from "../use-case-interface/IGetLawyersApplication";


export class GetLawyerApplication implements IGetLawyerApplication {

    constructor(
        private _getLawyerRepo:IGetLawyerRepositorie
    ){}

    async execute(): Promise<getLawyerResponse[] | null> {
        try {
            let lawyer:LawyerProfileEntity[] | null =await this._getLawyerRepo.findAll()

            let response:getLawyerResponse[]=[]

            if(lawyer){
                response=GetLawyerMapper.toResponse(lawyer)
            }
        
            return response
        } catch (error) {
            throw error
        }
    }
}