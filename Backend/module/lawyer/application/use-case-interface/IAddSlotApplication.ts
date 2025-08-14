import { Types } from "mongoose";
import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";




export interface IAddSlotApplication{
    execute(lawyerId:Types.ObjectId,data:ISlotAvailablityEntity):Promise<void>;
}