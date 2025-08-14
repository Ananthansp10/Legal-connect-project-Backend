import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";


export interface IGetLawyerProfileUseCase{
    execute(lawyerId:string):Promise<LawyerProfileEntity | null>;
}