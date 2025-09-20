


export interface IDeleteSpecializationUseCase {
    execute(specId: string): Promise<void>;
}