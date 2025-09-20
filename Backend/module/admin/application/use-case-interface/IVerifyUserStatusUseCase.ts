

export interface IVerifyUserStatusUseCase {
    execute(userId: string, status: string): Promise<boolean>;
}