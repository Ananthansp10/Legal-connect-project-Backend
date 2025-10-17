import { AppException } from "../../../../common/error/errorException";
import { AppointmentStatus } from "../../../../common/status/appointmentStatus";
import { IAppointmentRequestDto } from "../../domain/dtos/appointmentDto";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { IBookAppointmentRepository } from "../../infrastructure/repositoryInterface/IbookAppointmentRepository";
import { IBookAppointmentUseCase } from "../use-case-interface/IBookAppointmentUseCase";
import moment from 'moment'

export class BookAppointmentUseCase implements IBookAppointmentUseCase {
  constructor(private _bookAppointmentRepo: IBookAppointmentRepository, private _appointmentRepo: IAppointmentRepository) {}

  async execute(data: IAppointmentRequestDto, caseId: string): Promise<void> {
    try {
      const appointmentExist =
        await this._bookAppointmentRepo.findAppointmentExist(
          data.lawyerId,
          data.date,
          data.time,
        );
      if (appointmentExist) {
        throw new AppException("Appointment Already Taken", 403);
      }
      const customCaseId =
        caseId && !isNaN(Number(caseId)) ? parseInt(caseId) : Date.now();
      let currentDate = new Date(data.date)
      let startWeek = moment(currentDate).startOf("week").toDate()
      let endWeek = moment(currentDate).endOf("week").toDate()
      let count = await this._appointmentRepo.findCancelAppointment(data.lawyerId,data.userId,startWeek,endWeek)
      if(count.length>2){
        const discountFee = (data.fee/25)*100
        await this._bookAppointmentRepo.create({...data,fee:discountFee,appointmentStatus:AppointmentStatus.PENDING,meetStart:false})
      }
      await this._bookAppointmentRepo.create({
        ...data,
        appointmentStatus: AppointmentStatus.PENDING,
        meetStart: false,
        caseId: customCaseId,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
