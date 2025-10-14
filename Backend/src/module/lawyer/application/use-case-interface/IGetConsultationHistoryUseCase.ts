import { IConsultationHistoryResponseDto } from "../../domain/dtos/consultationHistoryDto";

export interface IGetConsultationHistoryUseCase {
  execute(caseId: number): Promise<IConsultationHistoryResponseDto[]>;
}
