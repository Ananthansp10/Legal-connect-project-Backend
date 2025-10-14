import { Types } from "mongoose";
import { ISlotAvailablityRequestDto } from "../../domain/dtos/slotAvailablityDto";

export interface IAddSlotUseCase {
  execute(
    lawyerId: Types.ObjectId,
    data: ISlotAvailablityRequestDto,
  ): Promise<void>;
}
