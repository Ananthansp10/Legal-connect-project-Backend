export interface IAddress {
  street: string;
  country: string;
  state: string;
  city: string;
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

interface IEducation {
  degree: string;
  university: string;
  year: string;
}

interface IProfessionalInfo {
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

export interface ILawyerProfileDataDto {
  personalInfo: IPersonalInfo;
  professionalInfo: IProfessionalInfo;
}
