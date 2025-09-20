import { IAppointmentsRepository } from "../../infrastructure/repositoryInterface/IAppointmentsRepository";
import { AppointmentsData, IGetAppointmentsUseCase } from "../use-case-interface/IGetAppointmentsUseCase";


export class GetAppointmentsUseCase implements IGetAppointmentsUseCase{

    constructor(
        private _appointmentRepo:IAppointmentsRepository
    ){}

    async execute(appointmentStatus: string): Promise<AppointmentsData[] | []> {

        const appointments=await this._appointmentRepo.findAppointments(appointmentStatus)
        if(!appointments || appointments.length==0){
            return [];
        }
        let appointmentsDetails=await Promise.all(
            appointments?.map(async(appointment)=>{
                const userDetails=await this._appointmentRepo.findUserDetails(appointment.userId)
                const lawyerDetails=await this._appointmentRepo.findLawyerDetails(appointment.lawyerId)

                return{
                    userName:userDetails?.name!,
                    lawyerName:lawyerDetails?.personalInfo.name!,
                    problem:appointment.problem,
                    specialization:lawyerDetails?.proffessionalInfo.practiceAreas[0]!,
                    date:appointment.date,
                    time:appointment.time,
                    appointmentStatus:appointment.appointmentStatus,
                    userProfileImage:userDetails?.profileImage!,
                    lawyerProfileImage:lawyerDetails?.personalInfo.profileImage!
                }
            })
        )

        return appointmentsDetails
    }
}