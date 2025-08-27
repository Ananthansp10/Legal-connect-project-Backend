import { ILawyerSignup } from "../../../auth/lawyerAuth/domain/entity/lawyerEntity";
import { ILawyerResponse } from "../../domain/dtos/lawyerDto";
import { ILawyerRepository } from "../../infrastructure/repositoryInterface/ILawyerRepository";
import { LawyerMapper } from "../mapper/lawyerMapper";
import { ISearchLawyerUseCase } from "../use-case-interface/ISearchLawyerUseCase";


export class SearchLawyerUseCase implements ISearchLawyerUseCase{

    constructor(
        private _lawyerRepo:ILawyerRepository
    ){}

    async execute(name: string): Promise<ILawyerResponse[] | null> {
        const lawyer:ILawyerSignup[] | null=await this._lawyerRepo.searchLawyer(name)
        let response:ILawyerResponse[]=[]
        if(lawyer){
            response=await LawyerMapper.toResponse(lawyer)
        }
        return response
    }
}