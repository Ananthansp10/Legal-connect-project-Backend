import { Types } from "mongoose";


export interface ISubscribersEntity{
    lawyerId:Types.ObjectId;
    planId:Types.ObjectId;
    date:string;
}