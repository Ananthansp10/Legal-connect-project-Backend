import { Types } from "mongoose";
import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";


export interface IGetSlotRepository{
    getSlot(lawyerId:Types.ObjectId,type:string):Promise<ISlotAvailablityEntity[] | null>;
}