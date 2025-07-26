import { Types } from "mongoose";


export interface SlotRequestDto{
    lawyerId:Types.ObjectId;
    date:Date;
    timeSlots:Array<{startTime:string,endTime:string,isBooked:boolean}>
}

export interface AddNewSlot{
    date:Date;
    timeSlots:Array<{startTime:string,endTime:string,isBooked:boolean}>
}

export interface AddNewTime{
    startTime:string,
    endTime:string,
    isBooked:boolean
}