import { ILawyerProfileResponseDto } from "../../../lawyer/domain/dtos/lawyerProfileDto";

export interface IGetLawyerDetailsUseCase {
  execute(lawyerId: string): Promise<ILawyerProfileResponseDto | null>;
}
