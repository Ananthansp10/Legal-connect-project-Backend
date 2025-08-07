import { Types } from "mongoose";



export interface ISlotAvailablityEntity{
    lawyerId:Types.ObjectId;
    availablity:Array<{date:Date,timeSlots:Array<{startTime:string,endTime:string,isBooked:boolean}>}>
}