import { Types } from "mongoose";
import { BankEntity } from "../../domain/entity/bankEntity";


export interface IBankDetailsRepository {
    findBankDetails(lawyerId: Types.ObjectId): Promise<BankEntity | null>;
}