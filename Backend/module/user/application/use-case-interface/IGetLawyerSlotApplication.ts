import { ISlotResponseDto } from "../../domain/dtos/slotResponseDto";


export interface IGetLawyerSlotApplication{
    execute(lawyerId:string,date:string):Promise<ISlotResponseDto[] | null>;
}