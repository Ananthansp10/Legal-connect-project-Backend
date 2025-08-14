import { Types } from "mongoose";
import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";


export interface IGetSlotApplication{
    execute(lawyerId:Types.ObjectId,type:string):Promise<ISlotAvailablityEntity[] | null>;
}