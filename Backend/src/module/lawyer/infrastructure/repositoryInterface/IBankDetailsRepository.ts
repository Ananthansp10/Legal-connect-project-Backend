import { Types } from "mongoose";
import { IBankDetailsDto } from "../../domain/dtos/bankDetailsDto";

export interface IBankDetailsRepository {
  addBankDetails(
    lawyerId: Types.ObjectId,
    contactId: string,
    fundAccountId: string,
  ): Promise<void>;
  findBankDetails(lawyerId: Types.ObjectId): Promise<IBankDetailsDto | null>;
}
