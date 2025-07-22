import { LawyerSignupResponseDto } from "../../domain/dto/lawyerSignupDto";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";


export interface ILawyerSignupApplication{
    registerLawyer(data:ILawyerSignup):Promise<LawyerSignupResponseDto>;
}