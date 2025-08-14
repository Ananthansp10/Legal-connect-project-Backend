import { ILawyerResponse } from "../../domain/dtos/lawyerDto";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { IBaseRepository } from "../../infrastructure/repositoryInterface/IBaseRepository";
import { IGetUnverifiedLawyersUseCase } from "../use-case-interface/IGetUnverifiedLawyerUseCase";
import { UnverifiedLawyerMapper } from "../mapper/unverifiedLawyerMapper";

export class GetUnverifiedLawyersUseCase implements IGetUnverifiedLawyersUseCase{

    constructor(
        private _lawyerRepo:IBaseRepository<ILawyerSignup>
    ){}

   async execute(): Promise<ILawyerResponse[]> {

       let result:ILawyerSignup[] | null= await this._lawyerRepo.findAllUnverifiedLawyer()

       let response:ILawyerResponse[]=[]

       if(result){
            response=await UnverifiedLawyerMapper.toResponse(result)
       }

       return response
    }
}