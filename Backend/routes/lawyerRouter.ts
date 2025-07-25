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
import { verifyToken } from '../middlewares/verifyTokenMiddleware';
import { verifyRole } from '../middlewares/verifyRoleMiddleware';
import { CheckAccountStatusMongoRepositorie } from '../module/auth/userAuth/infrastructure/mongoRepositories/checkAccountStatusMongoRepositorie';
import { LawyerProfileController } from '../module/lawyer/interface/controller/lawyerProfileManagementController';
import { LawyerAddProfileMongoRepo } from '../module/lawyer/infrastructure/mongoRepositorie/lawyerAddProfileMongoRepo';
import { LawyerAddProfileAppliaction } from '../module/lawyer/application/use-case/lawyerAddProfileApplication';
import { GetLawyerProfileMongoRepositorie } from '../module/lawyer/infrastructure/mongoRepositorie/getLawyerProfileMongoRepositorie';
import { GetLawyerProfileApplication } from '../module/lawyer/application/use-case/getLawyerProfileApplication';
import { EditLawyerProfileMongoRepositorie } from '../module/lawyer/infrastructure/mongoRepositorie/editLawyerProfileMongoRepositorie';
import { LawyerEditProfileApplication } from '../module/lawyer/application/use-case/editLawyerProfileApplication';
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
const checkAccountStatusMongoRepo=new CheckAccountStatusMongoRepositorie()

const lawyerAuthController=new LawyerAuthController(
    lawyerSignupApplication,
    lawyerSigninApplication,
    forgotPasswordAplication,
    changePasswordApplication,
    resetPasswordApplication
)

const lawyerAddProfileRepo=new LawyerAddProfileMongoRepo()
const lawyerAddProfileApplication=new LawyerAddProfileAppliaction(lawyerAddProfileRepo)
const getLawyerProfileMongoRepo=new GetLawyerProfileMongoRepositorie()
const getLawyerProfileApplication=new GetLawyerProfileApplication(getLawyerProfileMongoRepo)
const editLawyerProfileMongoRepo=new EditLawyerProfileMongoRepositorie()
const lawyerEditProfileApplication=new LawyerEditProfileApplication(editLawyerProfileMongoRepo)

const lawyerProfileController=new LawyerProfileController(
    lawyerAddProfileApplication,
    getLawyerProfileApplication,
    lawyerEditProfileApplication
)

router.post('/signup',upload.array('files',2),(req,res)=>lawyerAuthController.registerLawyer(req as MulterRequest,res))

router.post('/signin',(req,res)=>lawyerAuthController.siginLawyer(req,res,authCookieService))

router.post('/logout',(req,res)=>lawyerAuthController.logout(req,res))

router.post('/forgot-password-email',(req,res)=>lawyerAuthController.forgotPassword(req,res))

router.post('/new-password',(req,res)=>lawyerAuthController.changePassword(req,res))

router.post('/reset-password',verifyToken,verifyRole(['lawyer']),(req,res)=>lawyerAuthController.resetPassword(req,res))

router.post('/add-profile',verifyToken,verifyRole(['lawyer']),upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'barCouncilCertificate', maxCount: 1 },
    { name: 'degreeCertificate', maxCount: 1 },
    { name: 'experienceCertificate', maxCount: 1 },
    { name: 'idProof', maxCount: 1 }
  ]),(req,res)=>lawyerProfileController.addLawyerProfile(req,res))

router.get('/get-profile/:lawyerId',verifyToken,verifyRole(['lawyer']),(req,res)=>lawyerProfileController.getLawyerProfile(req,res))

router.patch('/edit-profile',verifyToken,verifyRole(['lawyer']),upload.single('profileImage'),(req,res)=>lawyerProfileController.editLawyerProfile(req,res))

export default router;