import { IPlansResponseDto } from "../../domain/dtos/plansDto";

export interface IGetPlansUseCase {
  execute(): Promise<IPlansResponseDto[] | null>;
}
