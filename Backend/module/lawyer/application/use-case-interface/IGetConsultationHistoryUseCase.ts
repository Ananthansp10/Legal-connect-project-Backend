import { ConsultationHistoryResponseDto } from "../../domain/dtos/consultationHistoryDto";


export interface IGetConsultationHistoryUseCase {
    execute(caseId:number):Promise<ConsultationHistoryResponseDto[]>
}