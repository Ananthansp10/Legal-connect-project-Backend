import { Types } from "mongoose";
import { IBankDetailsDto } from "../../domain/dtos/bankDetailsDto";

export interface ICheckBankDetailsUseCase {
  execute(lawyerId: Types.ObjectId): Promise<IBankDetailsDto | null>;
}
