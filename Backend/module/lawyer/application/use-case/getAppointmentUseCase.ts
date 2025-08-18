import { Types } from "mongoose";
import { Appointment, IGetAppointmentUseCase } from "../use-case-interface/IGetAppointmentUseCase";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";


export class GetAppointmentUseCase implements IGetAppointmentUseCase{

    constructor(
        private _appointmentRepo:IAppointmentRepository
    ){}

    async execute(lawyerId: Types.ObjectId, appointmentStatus: string): Promise<Appointment[] | null> {
        const appointments=await this._appointmentRepo.getAppointments(lawyerId,appointmentStatus) || []
        if(appointments?.length==0){
            return null
        }
        const appointmentDetails=await Promise.all(
            appointments.map(async(appointment)=>{
                const userDetails=await this._appointmentRepo.findUserDetails(appointment.userId)
                return {
                    _id:appointment._id,
                    user:{
                        _id:userDetails?.id!,
                        name:userDetails?.name!,
                        profileImage:userDetails?.profileImage!
                    },
                    problem:appointment.problem,
                    date:appointment.date,
                    time:appointment.time,
                    mode:appointment.consultationMode,
                    status:appointment.appointmentStatus
                }
            })
        )

        return appointmentDetails
    }
}