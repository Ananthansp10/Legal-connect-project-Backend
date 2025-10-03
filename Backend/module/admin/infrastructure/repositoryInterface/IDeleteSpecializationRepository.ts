import { Types } from "mongoose";

export interface IDeleteSpecializationRepository {
  deleteSpecialization(specId: string): Promise<void>;
}
