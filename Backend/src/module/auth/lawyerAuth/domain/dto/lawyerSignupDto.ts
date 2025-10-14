export interface ILawyerSignupRequestDto {
  name: string;
  email: string;
  password: string;
  specialization: [string];
  experience: string;
  barCouncilNumber: string;
  documents: [string];
  isBlock: boolean;
  verified: boolean;
  _id?: string;
  reason?: string;
  createdAt: Date;
}

export interface ILawyerSignupResponseDto {
  id: string;
  name: string;
  email: string;
}
