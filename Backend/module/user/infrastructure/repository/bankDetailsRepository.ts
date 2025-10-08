import { Types } from "mongoose";
import { IBankEntity } from "../../domain/entity/bankEntity";
import { IBankDetailsRepository } from "../repositoryInterface/IBankDetailsRepository";
import { bankDetailsModel } from "../../../lawyer/infrastructure/models/bankDetails";

export class BankDetailsRepository implements IBankDetailsRepository {
  async findBankDetails(lawyerId: Types.ObjectId): Promise<IBankEntity | null> {
    return await bankDetailsModel.findOne({ lawyerId: lawyerId });
  }
}
