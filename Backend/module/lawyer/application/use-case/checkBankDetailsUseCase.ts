import { Types } from "mongoose";
import { BankDetailsDto } from "../../domain/dtos/bankDetailsDto";
import { IBankDetailsRepository } from "../../infrastructure/repositoryInterface/IBankDetailsRepository";
import { ICheckBankDetailsUseCase } from "../use-case-interface/ICheckBankDetailsUseCase";

export class CheckBankDetailsUseCase implements ICheckBankDetailsUseCase {
  constructor(private _bankDetailsRepo: IBankDetailsRepository) {}

  async execute(lawyerId: Types.ObjectId): Promise<BankDetailsDto | null> {
    return await this._bankDetailsRepo.findBankDetails(lawyerId);
  }
}
