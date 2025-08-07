import { AppError } from "../../../../../common/error/AppEnumError";
import { AppException } from "../../../../../common/error/errorException";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";
import { IHashService } from "../../../userAuth/infrastructure/services/IhashService";
import { LawyerSignupRequestDto, LawyerSignupResponseDto } from "../../domain/dto/lawyerSignupDto";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerSignupRepositorie } from "../../interface/repositories/lawyerSignupRepositorie";
import { ILawyerSignupApplication } from "../lawyer-use-case-interface/IlawyerSignupApplication";
import { LawyerSignupMapper as mapper } from "../mapper/lawyerSignupMapper";

export class LawyerSignupApplication implements ILawyerSignupApplication{

    constructor(
        private _lawyerRepo:ILawyerSignupRepositorie,
        private _hashService:IHashService
    ){}

    async registerLawyer(data: ILawyerSignup): Promise<LawyerSignupResponseDto> {
        
        let emailExist:ILawyerSignup | null=await this._lawyerRepo.findByEmail(data.email)

        if(emailExist && emailExist.verified){
            throw new AppException(AppError.USER_ALREADY_EXISTS,AppStatusCode.CONFLICT)
        }

        if(emailExist && emailExist.reason){
            let currentDate=new Date()
            let sixMonthLater=new Date(emailExist.createdAt!)
            sixMonthLater.setMonth(sixMonthLater.getMonth()+6)

            if(currentDate.getDay()==sixMonthLater.getDay() && currentDate.getMonth()==sixMonthLater.getMonth()){
                await this._lawyerRepo.deleteByEmail(emailExist.email)
                await this._lawyerRepo.create(data)
            }else{
                throw new AppException("Your Account has been rejected please try again after six month",AppStatusCode.ACCOUNT_BLOCKED)
            }
        }

        let hashedPassword=await this._hashService.hash(data.password)

        let lawyerObj=mapper.toRequest({...data,password:hashedPassword})

        let dbResponse:ILawyerSignup | null=await this._lawyerRepo.create(lawyerObj)

        let response=mapper.toResponse(dbResponse!)

        return response

    }
}