import { Types } from "mongoose";
import { ISpecData } from "../../infrastructure/repositoryInterface/IEditSpecializationRepository";

export interface IEditSpecializationUseCase {
  execute(specId: Types.ObjectId, data: ISpecData): Promise<void>;
}
