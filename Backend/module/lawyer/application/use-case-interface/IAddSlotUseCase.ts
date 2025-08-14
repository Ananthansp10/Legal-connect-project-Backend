import { Types } from "mongoose";
import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";




export interface IAddSlotUseCase{
    execute(lawyerId:Types.ObjectId,data:ISlotAvailablityEntity):Promise<void>;
}