import { Types } from "mongoose";
import { BankEntity } from "../../domain/entity/bankEntity";
import { IBankDetailsRepository } from "../repositoryInterface/IBankDetailsRepository";
import { bankDetailsModel } from "../../../lawyer/infrastructure/models/bankDetails";


export class BankDetailsRepository implements IBankDetailsRepository {

    async findBankDetails(lawyerId: Types.ObjectId): Promise<BankEntity | null> {
        return await bankDetailsModel.findOne({ lawyerId: lawyerId })
    }
}