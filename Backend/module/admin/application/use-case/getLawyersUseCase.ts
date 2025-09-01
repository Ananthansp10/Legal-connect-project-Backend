import { ILawyerResponse } from "../../domain/dtos/lawyerDto";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerRepository } from "../../infrastructure/repositoryInterface/ILawyerRepository";
import { IGetLawyersUseCase } from "../use-case-interface/IGetLawyerUseCase";
import { LawyerMapper } from "../mapper/lawyerMapper";

export class GetLawyersUseCase implements IGetLawyersUseCase{

    constructor(
        private _lawyerRepo:ILawyerRepository
    ){}

    async execute(): Promise<ILawyerResponse[]> {
        try {
            let lawyers:ILawyerSignup[] | null=await this._lawyerRepo.findAll()
            let response:ILawyerResponse[]=[]
            if(lawyers){
                response=await LawyerMapper.toResponse(lawyers) 
            }
            return response
        } catch (error) {
            throw error
        }
    }
}