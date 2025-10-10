export interface IAppointmentsData {
  userName: string;
  lawyerName: string;
  specialization: string;
  problem: string;
  date: string;
  time: string;
  userProfileImage: string;
  lawyerProfileImage: string;
  appointmentStatus: string;
}

export interface IGetAppointmentsUseCase {
  execute(
    appointmentStatus: string,
    startIndex: number,
    limit: number,
  ): Promise<
    { appointments: IAppointmentsData[] | []; totalAppointments: number } | []
  >;
}
