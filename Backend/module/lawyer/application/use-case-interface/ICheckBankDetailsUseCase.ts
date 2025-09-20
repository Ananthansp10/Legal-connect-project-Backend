import { Types } from "mongoose";
import { BankDetailsDto } from "../../domain/dtos/bankDetailsDto";


export interface ICheckBankDetailsUseCase {
    execute(lawyerId: Types.ObjectId): Promise<BankDetailsDto | null>;
}