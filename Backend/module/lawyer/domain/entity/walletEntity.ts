import { Types } from "mongoose";


interface TransactionHistory{
    transactionType:string;
    senderId:Types.ObjectId;
    senderName:string;
    amount:number;
    purpose:string;
}

export interface WalletEntity{
    recieverId:Types.ObjectId;
    transactionHistory:TransactionHistory[]
}