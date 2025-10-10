import { ISpecializationRequestDto } from "../../domain/dtos/specializationDto";

export interface IAddSpecializationUseCase {
  execute(data: ISpecializationRequestDto): Promise<void>;
}
