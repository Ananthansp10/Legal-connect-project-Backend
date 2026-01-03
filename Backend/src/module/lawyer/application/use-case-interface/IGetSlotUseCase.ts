import { Types } from "mongoose";
import { ISlotAvailablityResponseDto } from "../../domain/dtos/slotAvailablityDto";

export interface IGetSlotUseCase {
  execute(
    lawyerId: string,
    type: string,
  ): Promise<ISlotAvailablityResponseDto[] | null>;
}
