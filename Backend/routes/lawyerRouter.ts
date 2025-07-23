import express from 'express'
import { LawyerAuthController, MulterRequest } from '../module/auth/lawyerAuth/interface/controller/lawyerAuthController';
import { LawyerSignupMongoRepositorie } from '../module/auth/lawyerAuth/infrastructure/mongoRepositories/lawyerSignupMongoRepositorie';
import { LawyerSignupApplication } from '../module/auth/lawyerAuth/application/lawyer-use-case/lawyerSignupApplication';
import { HashService } from '../module/auth/userAuth/infrastructure/services/hashService';
import upload from '../config/multerConfig';
import { LawyerSigninMongoRepositorie } from '../module/auth/lawyerAuth/infrastructure/mongoRepositories/lawyerSigninMongoRepositorie';
import { LawyerSigninApplication } from '../module/auth/lawyerAuth/application/lawyer-use-case/lawyerSigninApplication';
import { TokenGenerationService } from '../module/auth/userAuth/infrastructure/services/tokenGenerationService';
import { CookieTokenService } from '../module/auth/userAuth/infrastructure/services/cookieTokenService';
import { LawyerForgotPasswordApplication } from '../module/auth/lawyerAuth/application/lawyer-use-case/lawyerForgotPasswordApplication';
import { ForgotPasswordEmailService } from '../module/auth/lawyerAuth/infrastructure/service/forgotPaaswordEmailService';
import { ForgotPasswordTokenGeneration } from '../module/auth/lawyerAuth/infrastructure/service/forgotPasswordTokenGeneration';
import { LawyerChangePasswordApplication } from '../module/auth/lawyerAuth/application/lawyer-use-case/lawyerChangePasswordApplication';
import { ChangePasswordMongoRepositorie } from '../module/auth/lawyerAuth/infrastructure/mongoRepositories/changePasswordMongoRepositorie';
import { LawyerResetPasswordApplication } from '../module/auth/lawyerAuth/application/lawyer-use-case/lawyerResetPasswordApplication';
const router=express.Router()

const lawyerSignupMongoRepo=new LawyerSignupMongoRepositorie()
const hashService=new HashService()
const lawyerSignupApplication=new LawyerSignupApplication(lawyerSignupMongoRepo,hashService)
const lawyerSigninMongoRepo=new LawyerSigninMongoRepositorie()
const tokenGenerationService=new TokenGenerationService()
const authCookieService=new CookieTokenService()
const lawyerSigninApplication=new LawyerSigninApplication(lawyerSigninMongoRepo,tokenGenerationService)
const emailService=new ForgotPasswordEmailService()
const forgotPasswordTokenGenerateService=new ForgotPasswordTokenGeneration()
const forgotPasswordAplication=new LawyerForgotPasswordApplication(emailService,forgotPasswordTokenGenerateService,lawyerSignupMongoRepo)
const lawyerChangePasswordRepo=new ChangePasswordMongoRepositorie()
const changePasswordApplication=new LawyerChangePasswordApplication(lawyerChangePasswordRepo,hashService)
const resetPasswordApplication=new LawyerResetPasswordApplication(lawyerChangePasswordRepo,hashService)

const lawyerAuthController=new LawyerAuthController(
    lawyerSignupApplication,
    lawyerSigninApplication,
    forgotPasswordAplication,
    changePasswordApplication,
    resetPasswordApplication
)

router.post('/signup',upload.array('files',2),(req,res)=>lawyerAuthController.registerLawyer(req as MulterRequest,res))

router.post('/signin',(req,res)=>lawyerAuthController.siginLawyer(req,res,authCookieService))

router.post('/logout',(req,res)=>lawyerAuthController.logout(req,res))

router.post('/forgot-password-email',(req,res)=>lawyerAuthController.forgotPassword(req,res))

router.post('/new-password',(req,res)=>lawyerAuthController.changePassword(req,res))

router.post('/reset-password',(req,res)=>lawyerAuthController.resetPassword(req,res))

export default router;