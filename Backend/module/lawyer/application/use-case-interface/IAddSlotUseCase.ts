import { Types } from "mongoose";
import { SlotAvailablityRequestDto } from "../../domain/dtos/slotAvailablityDto";




export interface IAddSlotUseCase {
    execute(lawyerId: Types.ObjectId, data: SlotAvailablityRequestDto): Promise<void>;
}