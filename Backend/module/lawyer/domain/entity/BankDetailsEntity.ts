import { Types } from "mongoose";

export interface BankDetailsEntity {
  name: string;
  email: string;
  phoneNumber: number;
  bankAccountNumber: string;
  ifscCode: string;
  bankName: string;
  lawyerId: Types.ObjectId;
}
