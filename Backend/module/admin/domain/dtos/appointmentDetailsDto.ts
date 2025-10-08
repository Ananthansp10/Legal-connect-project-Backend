import { Types } from "mongoose";

export interface IAppointmentDetailsDto {
  _id: Types.ObjectId;
  lawyerId: Types.ObjectId;
  userId: Types.ObjectId;
  date: string;
  time: string;
  consultationMode: "online" | "offline";
  problem: string;
  fee: number;
  appointmentStatus: "Pending" | "Accepted" | "Rejected" | "Completed" | string;
  meetStart: boolean;
  caseId: number;
  __v?: number;
  userDetails: IUserDetails;
  lawyerDetails: ILawyerDetails;
}

export interface IUserDetails {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  gender: "Male" | "Female" | "Other" | string;
  DOB: string;
  proffession: string;
  company: string;
  profileImage: string;
  address: IUserAddress[];
  __v?: number;
}

export interface IUserAddress {
  addressType: string;
  location: string;
  houseNumber: string;
  pincode: string;
  state: string;
  city: string;
  country: string;
}

export interface ILawyerDetails {
  _id: Types.ObjectId;
  lawyerId: Types.ObjectId;
  personalInfo: ILawyerPersonalInfo;
  proffessionalInfo: ILawyerProfessionalInfo;
  __v?: number;
}

export interface ILawyerPersonalInfo {
  name: string;
  email: string;
  phoneNumber: string;
  gender: "Male" | "Female" | "Other" | string;
  DOB: string;
  address: IUserAddress;
  profileImage?: string;
}

export interface ILawyerProfessionalInfo {
  experience: number;
  specialization: string[];
  barCouncilId?: string;
  certificates?: string[];
  availableDays?: string[];
}
