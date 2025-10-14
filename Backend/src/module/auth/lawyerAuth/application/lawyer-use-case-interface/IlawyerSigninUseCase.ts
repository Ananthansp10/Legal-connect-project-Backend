import { ILawyerSigninResponseDto } from "../../domain/dto/lawyerSigninDto";

export interface ILawyerSigninUseCase {
  execute(email: string, password: string): Promise<ILawyerSigninResponseDto>;
}
