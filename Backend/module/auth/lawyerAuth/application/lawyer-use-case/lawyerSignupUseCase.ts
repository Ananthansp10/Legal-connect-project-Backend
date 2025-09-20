import { AppError } from "../../../../../common/error/AppEnumError";
import { AppException } from "../../../../../common/error/errorException";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";
import { IHashService } from "../../../userAuth/infrastructure/services/IhashService";
import { LawyerSignupRequestDto, LawyerSignupResponseDto } from "../../domain/dto/lawyerSignupDto";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerSignupRepository } from "../../infrastructure/repositoryInterface/ILawyerSignupRepository";
import { ILawyerSignupUseCase } from "../lawyer-use-case-interface/IlawyerSignupUseCase";
import { LawyerSignupMapper as mapper } from "../mapper/lawyerSignupMapper";

export class LawyerSignupUseCase implements ILawyerSignupUseCase {

    constructor(
        private _lawyerRepo: ILawyerSignupRepository,
        private _hashService: IHashService
    ) { }

    async registerLawyer(data: LawyerSignupRequestDto): Promise<LawyerSignupResponseDto> {

        const emailExist: ILawyerSignup | null = await this._lawyerRepo.findByEmail(data.email)

        if (emailExist && emailExist.verified) {
            throw new AppException(AppError.USER_ALREADY_EXISTS, AppStatusCode.CONFLICT)
        }

        if (emailExist && emailExist.reason) {
            const currentDate = new Date()
            let sixMonthLater = new Date(emailExist.createdAt!)
            sixMonthLater.setMonth(sixMonthLater.getMonth() + 6)

            if (currentDate.getDay() == sixMonthLater.getDay() && currentDate.getMonth() == sixMonthLater.getMonth()) {
                await this._lawyerRepo.deleteByEmail(emailExist.email)
                await this._lawyerRepo.create(data)
            } else {
                throw new AppException("Your Account has been rejected please try again after six month", AppStatusCode.ACCOUNT_BLOCKED)
            }
        }

        const hashedPassword = await this._hashService.hash(data.password)

        const lawyerObj = mapper.toRequest({ ...data, password: hashedPassword })

        const dbResponse: ILawyerSignup | null = await this._lawyerRepo.create(lawyerObj)

        const response = mapper.toResponse(dbResponse!)

        return response

    }
}