import { Types } from "mongoose";

export interface BankDetailsDto {
  _id: Types.ObjectId;
  lawyerId: Types.ObjectId;
  conatctId: string;
  fundAccountId: string;
}

export interface BankDetailsRequestDto {
  name: string;
  email: string;
  phoneNumber: number;
  bankAccountNumber: string;
  ifscCode: string;
  bankName: string;
  lawyerId: Types.ObjectId;
}
