import { SpecializationRequestDto } from "../../domain/dtos/specializationDto";



export interface IAddSpecializationUseCase {
    execute(data: SpecializationRequestDto): Promise<void>;
}