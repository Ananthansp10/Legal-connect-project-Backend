import { ILawyerResponse } from "../../domain/dtos/lawyerDto";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerRepositorie } from "../../interface/repositories/ILawyerRepositorie";
import { IGetLawyersApplication } from "../use-case-interface/IGetLawyerApplication";
import { LawyerMapper } from "../mapper/lawyerMapper";

export class GetLawyersApplication implements IGetLawyersApplication{

    constructor(
        private lawyerRepo:ILawyerRepositorie
    ){}

    async execute(): Promise<ILawyerResponse[]> {
        try {
            let lawyers:ILawyerSignup[] | null=await this.lawyerRepo.findAll()
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