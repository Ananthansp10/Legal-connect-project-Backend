import { Types } from "mongoose";

interface IAddress {
  street: string;
  country: string;
  state: string;
  city: string;
}

interface IEducation {
  degree: string;
  university: string;
  year: string;
}

interface IPersonalInfo {
  name: string;
  email: string;
  phoneNumber: string;
  DOB: string;
  gender: string;
  address: IAddress;
  language: string[];
  profileImage: string;
}

interface IProffessionalInfo {
  practiceAreas: string[];
  barRegisterNumber: string;
  experience: string;
  courtName: string;
  workLocation: string;
  fee: string;
  availableDays: string[];
  startTime: string;
  endTime: string;
  education: IEducation;
  documents: string[];
}

export interface ILawyerProfileResponseDto {
  _id?: Types.ObjectId;
  lawyerId: Types.ObjectId;
  personalInfo: IPersonalInfo;
  proffessionalInfo: IProffessionalInfo;
}
