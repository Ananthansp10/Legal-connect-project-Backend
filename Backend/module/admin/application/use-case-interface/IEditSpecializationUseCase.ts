import { Types } from "mongoose";
import { SpecData } from "../../infrastructure/repositoryInterface/IEditSpecializationRepository";

export interface IEditSpecializationUseCase {
  execute(specId: Types.ObjectId, data: SpecData): Promise<void>;
}
