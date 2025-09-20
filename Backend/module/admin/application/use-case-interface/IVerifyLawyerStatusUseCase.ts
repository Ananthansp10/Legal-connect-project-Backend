

export interface ILawyerVerificationStatusUseCase {
    execute(lawyerId: string, status: string): Promise<boolean>;
}