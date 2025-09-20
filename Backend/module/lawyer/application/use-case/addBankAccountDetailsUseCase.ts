import axios from "axios";
import { IBankDetailsRepository } from "../../infrastructure/repositoryInterface/IBankDetailsRepository";
import { IAddBankAccountDetailsUseCase } from "../use-case-interface/IAddBankAccountDetailsUseCase";
import { BankDetailsRequestDto } from "../../domain/dtos/bankDetailsDto";

export class AddBankAccountDetailsUseCase implements IAddBankAccountDetailsUseCase {

  constructor(
    private _bankDetailsRepo: IBankDetailsRepository
  ) { }

  async execute(data: BankDetailsRequestDto): Promise<void> {
    try {
      // 1️⃣ Create Contact
      const contactResponse = await axios.post(
        "https://api.razorpay.com/v1/contacts",
        {
          name: data.name,
          email: data.email,
          contact: data.phoneNumber,
          type: "vendor",
          reference_id: data.lawyerId,
          notes: { role: "Lawyer in Legal Connect App" },
        },
        {
          auth: {
            username: process.env.RAZORPAY_KEY_ID!,
            password: process.env.RAZORPAY_KEY_SECRET!,
          },
        }
      );
      const contactId = contactResponse.data.id;
      console.log("Contact Created:", contactId);

      // 2️⃣ Create Fund Account (Linked Bank Account)
      const fundAccountResponse = await axios.post(
        "https://api.razorpay.com/v1/fund_accounts",
        {
          contact_id: contactId,
          account_type: "bank_account",
          bank_account: {
            name: data.name,
            ifsc: data.ifscCode,
            account_number: data.bankAccountNumber,
          },
          notes: { purpose: "lawyer payout" }
        },
        {
          auth: {
            username: process.env.RAZORPAY_KEY_ID!,
            password: process.env.RAZORPAY_KEY_SECRET!,
          },
        }
      );
      const fundAccountId = fundAccountResponse.data.id;
      console.log("Fund Account Created:", fundAccountId);

      // 3️⃣ Create Payout
      const payoutResponse = await axios.post(
        "https://api.razorpay.com/v2/payouts",
        {
          fund_account_id: fundAccountId,
          amount: 10000, // amount in paise (₹100)
          currency: "INR",
          mode: "IMPS",
          purpose: "payout",
          queue_if_low_balance: true,
          notes: { invoice_id: `INV_${Date.now()}` },
        },
        {
          auth: {
            username: process.env.RAZORPAY_KEY_ID!,
            password: process.env.RAZORPAY_KEY_SECRET!,
          },
        }
      );
      console.log("Payout Success:", payoutResponse.data);

      // 4️⃣ Optionally save contact and fund account details in your repository
      // await this._bankDetailsRepo.addBankDetails(data.lawyerId, contactId, fundAccountId);

    } catch (error: any) {
      console.error("Razorpay Error:", error.response?.data || error.message);
      throw error;
    }
  }
}
