import { ILawyerProfileResponseDto } from "../../domain/dtos/lawyerProfileDto";

export interface IGetLawyerProfileUseCase {
  execute(lawyerId: string): Promise<ILawyerProfileResponseDto | null>;
}
