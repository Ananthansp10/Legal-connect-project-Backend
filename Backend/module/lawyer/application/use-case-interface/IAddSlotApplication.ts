import { SlotRequestDto } from "../../domain/dtos/slotDtos";
import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";



export interface IAddSlotApplication{
    execute(data:SlotRequestDto):Promise<void>;
}