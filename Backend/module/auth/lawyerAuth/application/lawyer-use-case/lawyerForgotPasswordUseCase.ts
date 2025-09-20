import { AppError } from "../../../../../common/error/AppEnumError";
import { AppException } from "../../../../../common/error/errorException";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { IForgotPasswordEmailService } from "../../infrastructure/service/IforgotPasswordEmailService";
import { IForgotPasswordTokenGeneration } from "../../infrastructure/service/IforgotPasswordTokenGeneration";
import { ILawyerSignupRepository } from "../../infrastructure/repositoryInterface/ILawyerSignupRepository";
import { ILawyerForgotPasswordUseCase } from "../lawyer-use-case-interface/IlawyerForgotPasswordUseCase";


export class LawyerForgotPasswordUseCase implements ILawyerForgotPasswordUseCase {

    constructor(
        private _emailService: IForgotPasswordEmailService,
        private _ForgotPasswordTokenGenerate: IForgotPasswordTokenGeneration,
        private _lawyerRepo: ILawyerSignupRepository
    ) { }

    async execute(email: string): Promise<void> {
        try {
            const lawyer: ILawyerSignup | null = await this._lawyerRepo.findByEmail(email)

            if (!lawyer) {
                throw new AppException(AppError.USER_NOT_FOUND, AppStatusCode.NOT_FOUND)
            }

            const token: string = await this._ForgotPasswordTokenGenerate.generateForgotPasswordToken({ email: email })

            this._emailService.sendForgotPasswordEMail(email, lawyer.name, token)

        } catch (error) {
            throw error
        }

    }
}