import { Types } from "mongoose";

export interface BankEntity {
  _id: Types.ObjectId;
  lawyerId: Types.ObjectId;
  contactId: string;
  fundAccountId: string;
}
