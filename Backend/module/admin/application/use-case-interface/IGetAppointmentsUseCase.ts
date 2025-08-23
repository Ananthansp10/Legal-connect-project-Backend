

export interface AppointmentsData{
    userName:string;
    lawyerName:string;
    specialization:string;
    problem:string;
    date:string;
    time:string;
    userProfileImage:string;
    lawyerProfileImage:string;
    appointmentStatus:string;
}

export interface IGetAppointmentsUseCase{
    execute(appointmentStatus:string):Promise<AppointmentsData[] | []>;
}