import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";


export interface IAddSlotRepositorie{
    addSlot(data:ISlotAvailablityEntity):Promise<void>;
}