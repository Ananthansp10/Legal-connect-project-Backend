interface IPlans {
  name: string;
  price: number;
  planType: string;
  duration: number;
  totalAppointments: number;
  status: string;
  features: string[];
  isDeleted: boolean;
}

export interface IPlanDetailsDto {
  lawyerId: string;
  planDetails: IPlans;
  activationDate: string;
  expiryDate: string;
  isActive: boolean;
  totalAppointments: number;
  appointmentsCount: number;
  date: string;
  price: number;
}
