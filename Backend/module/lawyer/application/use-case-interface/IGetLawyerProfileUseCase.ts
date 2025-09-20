import { LawyerProfileResponseDto } from "../../domain/dtos/lawyerProfileDto";


export interface IGetLawyerProfileUseCase {
    execute(lawyerId: string): Promise<LawyerProfileResponseDto | null>;
}