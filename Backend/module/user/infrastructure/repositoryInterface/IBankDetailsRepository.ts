import { Types } from "mongoose";
import { IBankEntity } from "../../domain/entity/bankEntity";

export interface IBankDetailsRepository {
  findBankDetails(lawyerId: Types.ObjectId): Promise<IBankEntity | null>;
}
