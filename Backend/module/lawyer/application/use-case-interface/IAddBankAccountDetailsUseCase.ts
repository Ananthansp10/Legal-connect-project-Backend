import { BankDetailsEntity } from "../../domain/entity/BankDetailsEntity";


export interface IAddBankAccountDetailsUseCase{
    execute(data:BankDetailsEntity):Promise<void>;
}