import { AddNewSlot, AddNewTime } from "../../domain/dtos/slotDtos";
import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";
import { Types } from "mongoose";


export interface IAddSlotRepositorie{
    findSlot(lawyerId:Types.ObjectId):Promise<ISlotAvailablityEntity | null>;
    addSlot(data:ISlotAvailablityEntity):Promise<void>;
    addNewSlot(lawyerId:Types.ObjectId,slot:AddNewSlot):Promise<void>;
    addNewTime(lawyerId:Types.ObjectId,currentDate:Date,time:AddNewTime):Promise<void>;
}