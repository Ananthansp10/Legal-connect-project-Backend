import {
  ILawyerSignupRequestDto,
  ILawyerSignupResponseDto,
} from "../../domain/dto/lawyerSignupDto";

export interface ILawyerSignupUseCase {
  registerLawyer(
    data: ILawyerSignupRequestDto,
  ): Promise<ILawyerSignupResponseDto>;
}
