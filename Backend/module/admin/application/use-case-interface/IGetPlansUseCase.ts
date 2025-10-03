import { PlansResponseDto } from "../../domain/dtos/plansDto";

export interface IGetPlansUseCase {
  execute(): Promise<PlansResponseDto[] | null>;
}
