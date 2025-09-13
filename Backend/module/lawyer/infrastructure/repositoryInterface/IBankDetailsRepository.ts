import { Types } from "mongoose";
import { BankDetailsDto } from "../../domain/dtos/bankDetailsDto";


export interface IBankDetailsRepository{
    addBankDetails(lawyerId:Types.ObjectId,contactId:string,fundAccountId:string):Promise<void>;
    findBankDetails(lawyerId:Types.ObjectId):Promise<BankDetailsDto | null>;
}