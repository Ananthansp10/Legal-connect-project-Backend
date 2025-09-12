import { Types } from "mongoose";


export interface BankDetailsDto{
    _id:Types.ObjectId;
    lawyerId:Types.ObjectId;
    conatctId:string;
    fundAccountId:string;
}