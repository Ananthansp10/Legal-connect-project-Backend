import axios from "axios";
import { razorpay } from "../../../../config/razorpayConfig";
import { BankDetailsEntity } from "../../domain/entity/BankDetailsEntity";
import { IBankDetailsRepository } from "../../infrastructure/repositoryInterface/IBankDetailsRepository";
import { IAddBankAccountDetailsUseCase } from "../use-case-interface/IAddBankAccountDetailsUseCase";


export class AddBankAccountDetailsUseCase implements IAddBankAccountDetailsUseCase{

    constructor(
        private _bankDetailsRepo:IBankDetailsRepository
    ){}

    async execute(data: BankDetailsEntity): Promise<void> {
       try {
        const contact = await axios.post(
        "https://api.razorpay.com/v1/contacts",
        {
          name: data.name,
          email: data.email,
          contact: data.phoneNumber,
          type: "vendor",
          reference_id: data.lawyerId,
          notes: {
            role: "Lawyer in legal Connect App",
          },
        },
        {
          auth: {
            username: process.env.RAZORPAY_KEY_ID!,
            password: process.env.RAZORPAY_KEY_SECRET!,
          },
        }
      )
        const fundAccount = await axios.post(
        "https://api.razorpay.com/v1/fund_accounts",
        {
            contact_id: contact.data.id,
            account_type: "bank_account",
            bank_account: {
            name: data.name,
            ifsc: data.ifscCode,
            account_number: data.bankAccountNumber,
            },
        },
        {
            auth: {
            username: process.env.RAZORPAY_KEY_ID!,
            password: process.env.RAZORPAY_KEY_SECRET!,
            },
        }
    )
        await this._bankDetailsRepo.addBankDetails(data.lawyerId,contact.data.id,fundAccount.data.id)
       } catch (error) {
        console.log(error)
       }
    }
}