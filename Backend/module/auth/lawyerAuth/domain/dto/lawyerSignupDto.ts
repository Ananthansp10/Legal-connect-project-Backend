export interface LawyerSignupRequestDto {
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

export interface LawyerSignupResponseDto {
  id: string;
  name: string;
  email: string;
}
