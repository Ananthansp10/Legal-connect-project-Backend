import { Types } from "mongoose";

interface SlotData{
    startTime:string;
    endTime:string;
    isBooked:boolean
}

export interface IGetLawyerSlotUseCase{
    execute(lawyerId:Types.ObjectId,date:string):Promise<SlotData[] | undefined>;
}