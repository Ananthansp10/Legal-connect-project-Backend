import { Types } from "mongoose";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { IGetTodaysAppointmentsUseCase, TodaysAppointmentData } from "../use-case-interface/IGetTodaysAppointmentUseCase";
import { AppointmentStatus } from "../../../../common/status/appointmentStatus";


export class GetTodaysAppointmentsUseCase implements IGetTodaysAppointmentsUseCase{

    constructor(
        private _appointmentRepo:IAppointmentRepository
    ){}

    async execute(userId: Types.ObjectId): Promise<TodaysAppointmentData[] | []> {
        let appointments=await this._appointmentRepo.getTodaysAppointment(userId,new Date().toISOString().split('T')[0])
        if(!appointments||appointments?.length==0){
            return []
        }
        let appointmentsDetails=await Promise.all(
            appointments?.map(async(appointment)=>{
                let lawyerDetails=await this._appointmentRepo.findLawyerDetails(appointment.lawyerId)
                
                return{
                    _id:appointment._id!,
                    name:lawyerDetails?.personalInfo.name!,
                    profileImage:lawyerDetails?.personalInfo.profileImage!,
                    date:appointment.date,
                    time:appointment.time,
                    mode:appointment.consultationMode,
                    specialization:lawyerDetails?.proffessionalInfo.practiceAreas[0]!
                }
            })
        )

        return appointmentsDetails
    }
}