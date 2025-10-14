import axios from "axios";
import { IBankDetailsRepository } from "../../infrastructure/repositoryInterface/IBankDetailsRepository";
import { IAddBankAccountDetailsUseCase } from "../use-case-interface/IAddBankAccountDetailsUseCase";
import { IBankDetailsRequestDto } from "../../domain/dtos/bankDetailsDto";

export class AddBankAccountDetailsUseCase
  implements IAddBankAccountDetailsUseCase
{
  constructor(private _bankDetailsRepo: IBankDetailsRepository) {}

  async execute(data: IBankDetailsRequestDto): Promise<void> {
    try {
      const keyId = process.env.RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      const auth =
        "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");

      const linkedAccount = await axios.post(
        process.env.LINKED_ACCOUNT_URL!,
        {
          type: "route",
          reference_id: data.lawyerId.toString().slice(0, 20),
          email: data.email,
          phone: data.phoneNumber,
          legal_business_name: "Legal Connect",
          business_type: "individual",
          contact_name: "John Doe",
          profile: {
            category: "services",
            subcategory: "professional_services",
            addresses: {
              registered: {
                street1: "123, MG Road",
                street2: "1st Block",
                city: "Bengaluru",
                state: "Karnataka",
                postal_code: "560001",
                country: "IN",
              },
            },
          },
        },
        {
          headers: { Authorization: auth, "Content-Type": "application/json" },
        },
      );

      console.log("Linked Account ID:", linkedAccount);

      const contact = await axios.post(
        process.env.CONTACT_URL!,
        {
          name: data.name,
          email: data.email,
          contact: data.phoneNumber,
          type: "vendor",
          reference_id: linkedAccount.data.id,
        },
        { headers: { Authorization: auth } },
      );

      console.log("✅ Contact Created:", contact.data.id);

      const fundAccount = await axios.post(
        process.env.FUND_ACCOUNT_URL!,
        {
          contact_id: contact.data.id,
          account_type: "bank_account",
          bank_account: {
            name: data.name,
            ifsc: data.ifscCode,
            account_number: data.bankAccountNumber,
          },
        },
        { headers: { Authorization: auth } },
      );

      console.log("✅ Fund Account Created:", fundAccount.data.id);

      await this._bankDetailsRepo.addBankDetails(
        data.lawyerId,
        linkedAccount.data.id,
        fundAccount.data.id,
      );
    } catch (error: any) {
      console.error("Razorpay Error:", error.response?.data || error.message);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      }

      throw error;
    }
  }
}
