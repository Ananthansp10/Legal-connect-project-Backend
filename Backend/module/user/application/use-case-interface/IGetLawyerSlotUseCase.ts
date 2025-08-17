import { Types } from "mongoose";
import { ISlotResponseDto } from "../../domain/dtos/slotResponseDto";


export interface IGetLawyerSlotApplication{
    execute(lawyerId:Types.ObjectId,date:string):Promise<any>
}