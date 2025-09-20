import { SpecializationResponseDto } from "../../domain/dtos/specializationDto";


export interface IGetSpecializationUseCase {
    execute(): Promise<SpecializationResponseDto[] | null>;
}