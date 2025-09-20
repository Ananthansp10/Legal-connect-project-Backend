import { BankDetailsRequestDto } from "../../domain/dtos/bankDetailsDto";


export interface IAddBankAccountDetailsUseCase {
    execute(data: BankDetailsRequestDto): Promise<void>;
}