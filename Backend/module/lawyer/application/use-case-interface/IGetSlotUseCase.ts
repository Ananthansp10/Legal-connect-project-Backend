import { Types } from "mongoose";
import { SlotAvailablityResponseDto } from "../../domain/dtos/slotAvailablityDto";


export interface IGetSlotUseCase {
    execute(lawyerId: Types.ObjectId, type: string): Promise<SlotAvailablityResponseDto[] | null>;
}