export interface IDeleteSpecializationRepository {
  deleteSpecialization(specId: string): Promise<void>;
}
