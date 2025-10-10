import {
  IConsultationHistoryRequestDto,
  IConsultationHistoryResponseDto,
} from "../../domain/dtos/consultationHistoryDto";
import { IAppointmentRepository } from "../../infrastructure/repositoryInterface/IAppointmentRepository";
import { ConsultationHistoryMapper } from "../mapper/consultationHistoryMapper";
import { IGetConsultationHistoryUseCase } from "../use-case-interface/IGetConsultationHistoryUseCase";

export class GetConsultationHistoryUseCase
  implements IGetConsultationHistoryUseCase
{
  constructor(private _appointmentRepo: IAppointmentRepository) {}

  async execute(caseId: number): Promise<IConsultationHistoryResponseDto[]> {
    let consultations: IConsultationHistoryRequestDto[] | null =
      await this._appointmentRepo.getConsultationHistory(caseId);
    if (!consultations || consultations.length == 0) {
      return [];
    } else {
      return await ConsultationHistoryMapper.toResponse(consultations);
    }
  }
}
