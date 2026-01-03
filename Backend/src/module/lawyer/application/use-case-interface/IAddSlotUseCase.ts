import { ISlotAvailablityRequestDto } from "../../domain/dtos/slotAvailablityDto";

export interface IAddSlotUseCase {
  execute(lawyerId: string, data: ISlotAvailablityRequestDto): Promise<void>;
}
