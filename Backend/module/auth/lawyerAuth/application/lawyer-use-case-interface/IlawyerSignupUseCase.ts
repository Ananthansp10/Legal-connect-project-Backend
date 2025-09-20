import { LawyerSignupRequestDto, LawyerSignupResponseDto } from "../../domain/dto/lawyerSignupDto";


export interface ILawyerSignupUseCase {
    registerLawyer(data: LawyerSignupRequestDto): Promise<LawyerSignupResponseDto>;
}