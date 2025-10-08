export interface Address {
  street: string;
  country: string;
  state: string;
  city: string;
}

interface PersonalInfo {
  name: string;
  email: string;
  phoneNumber: string;
  DOB: string;
  gender: string;
  address: Address;
  language: string[];
  profileImage: string;
}

interface Education {
  degree: string;
  university: string;
  year: string;
}

interface ProfessionalInfo {
  practiceAreas: string[];
  barRegisterNumber: string;
  experience: string;
  courtName: string;
  workLocation: string;
  fee: string;
  availableDays: string[];
  startTime: string;
  endTime: string;
  education: Education;
  documents: string[];
}

export interface LawyerProfileDataDto {
  personalInfo: PersonalInfo;
  professionalInfo: ProfessionalInfo;
}
