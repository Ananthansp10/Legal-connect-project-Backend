export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
}

export interface IUserDetails {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender?: string;
  DOB?: string;
  proffession?: string;
  company?: string;
  profileImage?: string;
  address?: IAddress;
}

export interface IAppointmentDto {
  _id: string;
  lawyerId: string;
  userId: string;
  date: string;
  time: string;
  consultationMode: "online" | "offline" | string;
  problem: string;
  fee: number;
  appointmentStatus:
    | "Accepted"
    | "Pending"
    | "Rejected"
    | "Cancelled"
    | "Completed"
    | string;
  meetStart: boolean;
  caseId: number | string;
  userDetails?: IUserDetails;
  payment?: string;
  paymentDate?: string;
  notes?: string;
}
