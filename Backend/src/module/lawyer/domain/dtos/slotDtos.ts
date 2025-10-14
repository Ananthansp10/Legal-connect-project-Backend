import { Types } from "mongoose";

export interface ISlotRequestDto {
  lawyerId: Types.ObjectId;
  date: string;
  timeSlots: Array<{ startTime: string; endTime: string; isBooked: boolean }>;
}

export interface IAddNewSlot {
  date: string;
  timeSlots: Array<{ startTime: string; endTime: string; isBooked: boolean }>;
}

export interface IAddNewTime {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}
