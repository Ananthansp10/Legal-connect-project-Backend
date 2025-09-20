import { LawyerProfileResponseDto } from "../../../lawyer/domain/dtos/lawyerProfileDto";


export interface IGetLawyerDetailsUseCase {
    execute(lawyerId: string): Promise<LawyerProfileResponseDto | null>;
}