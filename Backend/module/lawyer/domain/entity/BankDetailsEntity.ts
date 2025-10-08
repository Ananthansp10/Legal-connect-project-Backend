import { Types } from "mongoose";

export interface IBankDetailsEntity {
  name: string;
  email: string;
  phoneNumber: number;
  bankAccountNumber: string;
  ifscCode: string;
  bankName: string;
  lawyerId: Types.ObjectId;
}
