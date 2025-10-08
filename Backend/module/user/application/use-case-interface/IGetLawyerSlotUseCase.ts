import { Types } from "mongoose";

export interface SlotDataResponseDto {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface IGetLawyerSlotUseCase {
  execute(
    lawyerId: Types.ObjectId,
    date: string,
  ): Promise<SlotDataResponseDto[] | undefined>;
}
