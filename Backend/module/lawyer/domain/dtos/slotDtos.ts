import { Types } from "mongoose";


export interface SlotRequestDto{
    lawyerId:Types.ObjectId;
    date:string;
    timeSlots:Array<{startTime:string,endTime:string,isBooked:boolean}>
}

export interface AddNewSlot{
    date:string;
    timeSlots:Array<{startTime:string,endTime:string,isBooked:boolean}>
}

export interface AddNewTime{
    startTime:string,
    endTime:string,
    isBooked:boolean
}