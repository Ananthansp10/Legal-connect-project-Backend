import { Types } from "mongoose";

export interface ISlotDataResponseDto {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface IGetLawyerSlotUseCase {
  execute(
    lawyerId: Types.ObjectId,
    date: string,
  ): Promise<ISlotDataResponseDto[] | undefined>;
}
