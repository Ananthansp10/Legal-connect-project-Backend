import express from 'express'
import { LawyerAuthController, MulterRequest } from '../module/auth/lawyerAuth/interface/controller/lawyerAuthController';
import { LawyerSignupRepository } from '../module/auth/lawyerAuth/infrastructure/repository/lawyerSignupRepository';
import { LawyerSignupUseCase } from '../module/auth/lawyerAuth/application/lawyer-use-case/lawyerSignupUseCase';
import { HashService } from '../module/auth/userAuth/infrastructure/services/hashService';
import upload from '../config/multerConfig';
import { LawyerSigninRepository } from '../module/auth/lawyerAuth/infrastructure/repository/lawyerSigninRepository';
import { LawyerSigninUseCase } from '../module/auth/lawyerAuth/application/lawyer-use-case/lawyerSigninUseCase';
import { TokenGenerationService } from '../module/auth/userAuth/infrastructure/services/tokenGenerationService';
import { CookieTokenService } from '../module/auth/userAuth/infrastructure/services/cookieTokenService';
import { LawyerForgotPasswordUseCase } from '../module/auth/lawyerAuth/application/lawyer-use-case/lawyerForgotPasswordUseCase';
import { ForgotPasswordEmailService } from '../module/auth/lawyerAuth/infrastructure/service/forgotPaaswordEmailService';
import { ForgotPasswordTokenGeneration } from '../module/auth/lawyerAuth/infrastructure/service/forgotPasswordTokenGeneration';
import { LawyerChangePasswordUseCase } from '../module/auth/lawyerAuth/application/lawyer-use-case/lawyerChangePasswordUseCase';
import { ChangePasswordRepository } from '../module/auth/lawyerAuth/infrastructure/repository/changePasswordRepository';
import { LawyerResetPasswordUseCase } from '../module/auth/lawyerAuth/application/lawyer-use-case/lawyerResetPasswordUseCase';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';
import { verifyRole } from '../middlewares/verifyRoleMiddleware';
import { CheckAccountStatusMongoRepositorie } from '../module/auth/userAuth/infrastructure/mongoRepositories/checkAccountStatusMongoRepositorie';
import { LawyerProfileController } from '../module/lawyer/interface/controller/lawyerProfileManagementController';
import { LawyerAddProfileRepository } from '../module/lawyer/infrastructure/repository/lawyerAddProfileRepository';
import { LawyerAddProfileUseCase } from '../module/lawyer/application/use-case/lawyerAddProfileUseCase';
import { GetLawyerProfileRepository } from '../module/lawyer/infrastructure/repository/getLawyerProfileRepository';
import { GetLawyerProfileUseCase } from '../module/lawyer/application/use-case/getLawyerProfileUseCase';
import { EditLawyerProfileRepository } from '../module/lawyer/infrastructure/repository/editLawyerProfileRepository';
import { LawyerEditProfileUseCase } from '../module/lawyer/application/use-case/editLawyerProfileUseCase';
import { AddSlotRepository } from '../module/lawyer/infrastructure/repository/addSlotRepository';
import { AddSlotUseCase } from '../module/lawyer/application/use-case/addSlotUseCase';
import { LawyerController } from '../module/lawyer/interface/controller/lawyerController';
import { GetSlotRepository } from '../module/lawyer/infrastructure/repository/getSlotRepository';
import { GetSlotUseCase } from '../module/lawyer/application/use-case/getSlotUseCase';
import { UpdateRuleStatusRepository } from '../module/lawyer/infrastructure/repository/updateRuleStatusRepository';
import { UpdateRuleStatusUseCase } from '../module/lawyer/application/use-case/updateRuleStatusUseCase';
const router=express.Router()

const lawyerSignupMongoRepo=new LawyerSignupRepository()
const hashService=new HashService()
const lawyerSignupApplication=new LawyerSignupUseCase(lawyerSignupMongoRepo,hashService)
const lawyerSigninMongoRepo=new LawyerSigninRepository()
const tokenGenerationService=new TokenGenerationService()
const authCookieService=new CookieTokenService()
const lawyerSigninApplication=new LawyerSigninUseCase(lawyerSigninMongoRepo,tokenGenerationService)
const emailService=new ForgotPasswordEmailService()
const forgotPasswordTokenGenerateService=new ForgotPasswordTokenGeneration()
const forgotPasswordAplication=new LawyerForgotPasswordUseCase(emailService,forgotPasswordTokenGenerateService,lawyerSignupMongoRepo)
const lawyerChangePasswordRepo=new ChangePasswordRepository()
const changePasswordApplication=new LawyerChangePasswordUseCase(lawyerChangePasswordRepo,hashService)
const resetPasswordApplication=new LawyerResetPasswordUseCase(lawyerChangePasswordRepo,hashService)

const lawyerAuthController=new LawyerAuthController(
    lawyerSignupApplication,
    lawyerSigninApplication,
    forgotPasswordAplication,
    changePasswordApplication,
    resetPasswordApplication
)

const lawyerAddProfileRepo=new LawyerAddProfileRepository()
const lawyerAddProfileApplication=new LawyerAddProfileUseCase(lawyerAddProfileRepo)
const getLawyerProfileMongoRepo=new GetLawyerProfileRepository()
const getLawyerProfileApplication=new GetLawyerProfileUseCase(getLawyerProfileMongoRepo)
const editLawyerProfileMongoRepo=new EditLawyerProfileRepository()
const lawyerEditProfileApplication=new LawyerEditProfileUseCase(editLawyerProfileMongoRepo)

const lawyerProfileController=new LawyerProfileController(
    lawyerAddProfileApplication,
    getLawyerProfileApplication,
    lawyerEditProfileApplication
)

const addSlotMongoRepo=new AddSlotRepository()
const addSlotApplication=new AddSlotUseCase(addSlotMongoRepo)
const getSlotMongoRepo=new GetSlotRepository()
const getSlotApplication=new GetSlotUseCase(getSlotMongoRepo)
const updateRuleMongoRepo=new UpdateRuleStatusRepository
const updateRuleStatusApplication=new UpdateRuleStatusUseCase(updateRuleMongoRepo)

const lawyerController=new LawyerController(
    addSlotApplication,
    getSlotApplication,
    updateRuleStatusApplication
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

router.post('/add-slot/:lawyerId',verifyToken,verifyRole(['lawyer']),(req,res)=>lawyerController.addSlot(req,res))

router.get('/get-slots/:lawyerId/:type',verifyToken,verifyRole(['lawyer']),(req,res)=>lawyerController.getSlot(req,res))

router.patch('/update-rule-status/:ruleId/:ruleStatus',verifyToken,verifyRole(['lawyer']),(req,res)=>lawyerController.updateRuleStatus(req,res))

export default router;