import { ILawyerResponse } from "../../domain/dtos/lawyerDto";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { IBaseRepositorie } from "../../interface/repositories/IBaseRepositorie";
import { IGetUnverifiedLawyersApplication } from "../use-case-interface/IGetUnverifiedLawyerApplication";
import { UnverifiedLawyerMapper } from "../mapper/unverifiedLawyerMapper";

export class GetUnverifiedLawyers implements IGetUnverifiedLawyersApplication{

    constructor(
        private _lawyerRepo:IBaseRepositorie<ILawyerSignup>
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