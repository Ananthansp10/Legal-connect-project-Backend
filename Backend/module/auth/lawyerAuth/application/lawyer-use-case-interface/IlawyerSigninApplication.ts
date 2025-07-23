import { LawyerSigninResponseDto } from "../../domain/dto/lawyerSigninDto";


export interface ILawyerSigninApplication{
    execute(email:string,password:string):Promise<LawyerSigninResponseDto>;
}