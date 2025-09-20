import { ILawyerResponse } from "../../domain/dtos/lawyerDto";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerRepository } from "../../infrastructure/repositoryInterface/ILawyerRepository";
import { IGetLawyersUseCase } from "../use-case-interface/IGetLawyerUseCase";
import { LawyerMapper } from "../mapper/lawyerMapper";

export class GetLawyersUseCase implements IGetLawyersUseCase{

    constructor(
        private _lawyerRepo:ILawyerRepository
    ){}

    async execute(startIndex:number,limit:number): Promise<{data:ILawyerResponse[],totalData:number}> {
        try {
            const lawyers:{data:ILawyerSignup[],totalData:number} | null=await this._lawyerRepo.findAll(startIndex,limit)
            let response:ILawyerResponse[]=[]
            if(lawyers){
                response=await LawyerMapper.toResponse(lawyers.data) 
            }
            return {data:response,totalData:lawyers?.totalData || 0}
        } catch (error) {
            throw error
        }
    }
}