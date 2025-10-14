import { IBankDetailsRequestDto } from "../../domain/dtos/bankDetailsDto";

export interface IAddBankAccountDetailsUseCase {
  execute(data: IBankDetailsRequestDto): Promise<void>;
}
