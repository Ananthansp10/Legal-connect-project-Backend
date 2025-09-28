import { SpecializationResponseDto } from "../../domain/dtos/specializationDto";


export interface IGetSpecializationUseCase {
    execute(startIndex: number, limit: number): Promise<{ specializations: SpecializationResponseDto[], totalSpecializations: number } | null>;
}