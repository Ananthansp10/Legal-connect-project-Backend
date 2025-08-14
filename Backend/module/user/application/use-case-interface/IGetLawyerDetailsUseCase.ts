import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";


export interface IGetLawyerDetailsUseCase{
    execute(lawyerId:string):Promise<LawyerProfileEntity | null>;
}