import { ConsultationHistoryRequestDto, ConsultationHistoryResponseDto } from "../../domain/dtos/consultationHistoryDto";



export class ConsultationHistoryMapper {

    static async toResponse(consultationHistory:ConsultationHistoryRequestDto[]):Promise<ConsultationHistoryResponseDto[]>{
        const result = consultationHistory.map((data)=>{
            return {
                userName:data.userDetails.name,
                lawyerName:data.lawyerDetails.name,
                caseId:data.caseId!,
                caseDescription:data.problem,
                history:{
                    consultationMode:data.consultationMode,
                    consultationDate:data.date,
                    feedback:data.feedback!,
                    rating:data.rating!,
                    summaryNote:data.notes!
                }
            }
        })
        return result
    }
}