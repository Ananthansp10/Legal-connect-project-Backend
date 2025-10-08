import { Types } from "mongoose";

export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface IUserProfileEntitie {
  id?: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  DOB: string;
  proffession: string;
  company: string;
  profileImage: string;
  address: IAddress;
}
