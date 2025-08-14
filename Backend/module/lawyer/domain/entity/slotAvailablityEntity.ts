import { Types } from "mongoose";

interface BreakTimes{
    startTime:string;
    endTime:string;
}

export interface ISlotAvailablityEntity{
    lawyerId ? :Types.ObjectId;
    name:string;
    description:string;
    days:string[];
    startTime:string;
    endTime:string;
    startDate ? :string;
    endDate ? :string;
    breakTimes:[BreakTimes];
    priority:number;
    bufferTime:number;
    status:boolean;
}