import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";


export interface IAddSlotRepository {
    addSlot(data: ISlotAvailablityEntity): Promise<void>;
}