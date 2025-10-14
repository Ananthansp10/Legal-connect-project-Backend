import { Types } from "mongoose";
import { ISlotAvailablityResponseDto } from "../../domain/dtos/slotAvailablityDto";

export interface IGetSlotUseCase {
  execute(
    lawyerId: Types.ObjectId,
    type: string,
  ): Promise<ISlotAvailablityResponseDto[] | null>;
}
