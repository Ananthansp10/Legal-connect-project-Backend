import { Types } from "mongoose";

interface IBreakTimes {
  startTime: string;
  endTime: string;
}

export interface ISlotAvailablityRequestDto {
  lawyerId?: Types.ObjectId;
  name: string;
  description: string;
  days: string[];
  startTime: string;
  endTime: string;
  startDate?: string;
  endDate?: string;
  breakTimes: [IBreakTimes];
  priority: number;
  bufferTime: number;
  status: boolean;
}

export interface ISlotAvailablityResponseDto {
  lawyerId?: Types.ObjectId;
  name: string;
  description: string;
  days: string[];
  startTime: string;
  endTime: string;
  startDate?: string;
  endDate?: string;
  breakTimes: [IBreakTimes];
  priority: number;
  bufferTime: number;
  status: boolean;
}
