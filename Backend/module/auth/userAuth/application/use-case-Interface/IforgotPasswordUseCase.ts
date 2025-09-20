

export interface IForgotPasswordUseCase {
    execute(email: string): Promise<{ email: string }>;
}