import { ISpecializationResponseDto } from "../../domain/dtos/specializationDto";

export interface IGetSpecializationUseCase {
  execute(
    startIndex: number,
    limit: number,
  ): Promise<{
    specializations: ISpecializationResponseDto[];
    totalSpecializations: number;
  } | null>;
}
