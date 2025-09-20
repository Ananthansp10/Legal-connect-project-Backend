

export interface ILawyerForgotPasswordUseCase {
    execute(email: string): Promise<void>;
}