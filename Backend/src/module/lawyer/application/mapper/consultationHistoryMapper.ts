import {
  IConsultationHistoryRequestDto,
  IConsultationHistoryResponseDto,
} from "../../domain/dtos/consultationHistoryDto";

export class ConsultationHistoryMapper {
  static async toResponse(
    consultationHistory: IConsultationHistoryRequestDto[],
  ): Promise<IConsultationHistoryResponseDto[]> {
    const result = consultationHistory.map((data) => {
      return {
        userName: data.userDetails.name,
        lawyerName: data.lawyerDetails.name,
        caseId: data.caseId!,
        caseDescription: data.problem,
        history: {
          consultationMode: data.consultationMode,
          consultationDate: data.date,
          feedback: data.feedback!,
          rating: data.rating!,
          summaryNote: data.notes!,
        },
      };
    });
    return result;
  }
}
