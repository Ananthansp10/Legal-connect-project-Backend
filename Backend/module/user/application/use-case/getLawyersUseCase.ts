import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IGetLawyerRepository } from "../../interface/repository/getLawyerRepository";
import { getLawyerResponse } from "../mapper/getLawyerMapper";
import { GetLawyerMapper } from "../mapper/getLawyerMapper";
import { IGetLawyerUseCase } from "../use-case-interface/IGetLawyersUseCase";


export class GetLawyerUseCase implements IGetLawyerUseCase {

    constructor(
        private _getLawyerRepo:IGetLawyerRepository
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