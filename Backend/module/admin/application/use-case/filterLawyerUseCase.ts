import { ILawyerResponse } from "../../domain/dtos/lawyerDto";
import { ILawyerRepository } from "../../infrastructure/repositoryInterface/ILawyerRepository";
import { LawyerMapper } from "../mapper/lawyerMapper";
import { IFilterLawyerUseCase } from "../use-case-interface/IFilterLawyerUseCase";


export class FilterLawyerUseCase implements IFilterLawyerUseCase{

    constructor(
        private _lawyerRepo:ILawyerRepository
    ){}

    async execute(status: string): Promise<ILawyerResponse[] | null> {
        let lawyers=await this._lawyerRepo.filterLawyer(status)
        let response:ILawyerResponse[]=[]
        if(lawyers){
            response=await LawyerMapper.toResponse(lawyers)
        }
        return response
    }
}