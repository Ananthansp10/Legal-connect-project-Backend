import { Types } from "mongoose";

export interface ISpecData {
  name: string;
  description: string;
  isDeleted: boolean;
}

export interface IEditSpecializationRepository {
  editSpecialization(specId: Types.ObjectId, data: ISpecData): Promise<void>;
}
