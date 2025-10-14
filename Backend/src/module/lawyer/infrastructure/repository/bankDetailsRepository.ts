import { Types } from "mongoose";
import { IBankDetailsRepository } from "../repositoryInterface/IBankDetailsRepository";
import { bankDetailsModel } from "../models/bankDetails";
import { IBankDetailsDto } from "../../domain/dtos/bankDetailsDto";

export class BankDetailsRepository implements IBankDetailsRepository {
  async addBankDetails(
    lawyerId: Types.ObjectId,
    contactId: string,
    fundAccountId: string,
  ): Promise<void> {
    await bankDetailsModel.create({
      lawyerId: lawyerId,
      contactId: contactId,
      fundAccountId: fundAccountId,
    });
  }

  async findBankDetails(
    lawyerId: Types.ObjectId,
  ): Promise<IBankDetailsDto | null> {
    return await bankDetailsModel.findOne({ lawyerId: lawyerId });
  }
}
