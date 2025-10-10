import { Types } from "mongoose";

export interface IBankDetailsDto {
  _id: Types.ObjectId;
  lawyerId: Types.ObjectId;
  conatctId: string;
  fundAccountId: string;
}

export interface IBankDetailsRequestDto {
  name: string;
  email: string;
  phoneNumber: number;
  bankAccountNumber: string;
  ifscCode: string;
  bankName: string;
  lawyerId: Types.ObjectId;
}
