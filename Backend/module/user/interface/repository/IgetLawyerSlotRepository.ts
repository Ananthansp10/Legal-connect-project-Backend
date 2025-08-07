import { ISlotResponseDto } from "../../domain/dtos/slotResponseDto";

export interface IGetLawyerSlotRepository{
    getLawyerSlotDetails(lawyerId:string, date:string):Promise<ISlotResponseDto[] | null>;
}