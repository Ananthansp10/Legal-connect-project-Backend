import express from 'express'
import { UserSignupRepository } from '../module/auth/userAuth/infrastructure/repository/userSignupRepository';
import { UserSignupUseCase } from '../module/auth/userAuth/application/use-cases/userSignupUseCase';
import { UserAuthController } from '../module/auth/userAuth/interface/controller/userAuthController';
import { sendOtpMailService } from '../module/auth/userAuth/infrastructure/services/sendOtpMailService';
import { GenerateOtpService } from '../module/auth/userAuth/infrastructure/services/generateOtpService';
import { HashService } from '../module/auth/userAuth/infrastructure/services/hashService';
import { OtpService } from '../module/auth/userAuth/infrastructure/services/saveOtp';
import { OtpVerificationRepository } from '../module/auth/userAuth/infrastructure/repository/otpVerificationRepository';
import { OtpVerificationUseCase } from '../module/auth/userAuth/application/use-cases/otpVerificationUseCase';
import { ResendOtpUseCase } from '../module/auth/userAuth/application/use-cases/resendOtpUseCase';
import { ForgotPasswordUseCase } from '../module/auth/userAuth/application/use-cases/forgotPasswordUseCase';
import { ChangePasswordUseCase } from '../module/auth/userAuth/application/use-cases/changePasswordUseCase';
import { ForgotPasswordRepository } from '../module/auth/userAuth/infrastructure/repository/forgotPasswordRepository';
import { UserSigninRepository } from '../module/auth/userAuth/infrastructure/repository/userSigninRepository';
import { TokenGenerationService } from '../module/auth/userAuth/infrastructure/services/tokenGenerationService';
import { UserSigninUseCase } from '../module/auth/userAuth/application/use-cases/userSigninUseCase';
import { CookieTokenService } from '../module/auth/userAuth/infrastructure/services/cookieTokenService';
const router=express.Router()
import passport from '../config/passport'
import { GoogleAuthRepository } from '../module/auth/userAuth/infrastructure/repository/googleAuthRepository';
import { GoogleAuthUseCase } from '../module/auth/userAuth/application/use-cases/googleAuthUseCase';
import { ResetPasswordRepository } from '../module/auth/userAuth/infrastructure/repository/resetPasswordRepository';
import { ResetPasswordUseCase } from '../module/auth/userAuth/application/use-cases/resetPasswordUseCase';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';
import { verifyRole } from '../middlewares/verifyRoleMiddleware';
import { verifyAccountStatus } from '../middlewares/verifyAccountStatus';
import { CheckAccountStatusRepository } from '../module/auth/userAuth/infrastructure/repository/checkAccountStatusRepository';
import upload from '../config/multerConfig';
import { UserProfileController } from '../module/user/interface/controller/userProfileController';
import { AddProfileUseCase } from '../module/user/application/use-case/addProfileUseCase';
import { UserProfileRepository } from '../module/user/infrastructure/repository/userProfileRepository';
import { GetUserProfileUseCase } from '../module/user/application/use-case/getUserProfileUseCase';
import { GetProfileRepository } from '../module/user/infrastructure/repository/getProfileRepository';
import { EditProfileRepository } from '../module/user/infrastructure/repository/editProfileRepository';
import { EditUserProfileUseCase } from '../module/user/application/use-case/editUserProfileUseCase';
import { UserController } from '../module/user/interface/controller/userController';
import { GetLawyerRepository } from '../module/user/infrastructure/repository/getLawyersRepository';
import { GetLawyerUseCase } from '../module/user/application/use-case/getLawyersUseCase';
import { GetLawyerDetailsUseCase } from '../module/user/application/use-case/getLawyerDetailsUseCase';
import { GetLawyerSlotRepository } from '../module/user/infrastructure/repository/getLawyerSlotRepository';
import { GetLawyerSlotUseCase } from '../module/user/application/use-case/getLawyerSlotUseCase';
import { FilterLawyerUseCase } from '../module/user/application/use-case/filterLawyerUseCase';
import { SearchLawyerUseCase } from '../module/user/application/use-case/searchLawyerUseCase';
import { BookAppointmentRepository } from '../module/user/infrastructure/repository/bookAppointmentRepository';
import { BookAppointmentUseCase } from '../module/user/application/use-case/bookAppointmentUseCase';

const userSignupMongoRepo=new UserSignupRepository()
const otpsendEmail=new sendOtpMailService()
const generateOtp=new GenerateOtpService()
const hashData=new HashService()
const otpService=new OtpService()
const otpMongoRepo=new OtpVerificationRepository()
const otpVerificationUseCase=new OtpVerificationUseCase(otpMongoRepo,userSignupMongoRepo)
const userSignupApplication=new UserSignupUseCase(userSignupMongoRepo,otpsendEmail,generateOtp,hashData,otpService)
const resendOtpApplication=new ResendOtpUseCase(otpService,generateOtp,hashData,otpsendEmail)
const forgotPasswordApplication=new ForgotPasswordUseCase(otpService,generateOtp,hashData,otpsendEmail)
const forgotPasswordRepo=new ForgotPasswordRepository()
const changePasswordApplication=new ChangePasswordUseCase(forgotPasswordRepo,hashData)
const userSigninMongoRepo=new UserSigninRepository()
const tokenGenerationService=new TokenGenerationService()
const userSigninApplication=new UserSigninUseCase(userSigninMongoRepo,tokenGenerationService)
const cookieTokenService=new CookieTokenService()
const googleAuthMongoRepo=new GoogleAuthRepository()
const googleAuthApplication=new GoogleAuthUseCase(googleAuthMongoRepo,tokenGenerationService)
const resetPasswordMongoRepo=new ResetPasswordRepository()
const resetPasswordApplication=new ResetPasswordUseCase(resetPasswordMongoRepo,hashData)
const checkUserAccountStatusMongoRepo=new CheckAccountStatusRepository()



const userAuthController=new UserAuthController(
    userSignupApplication,
    otpVerificationUseCase,
    resendOtpApplication,
    forgotPasswordApplication,
    changePasswordApplication,
    userSigninApplication,
    googleAuthApplication,
    resetPasswordApplication
)

const userProfileRepo=new UserProfileRepository()

const userAddProfileApplication=new AddProfileUseCase(userProfileRepo)
const userGetProfileRepo=new GetProfileRepository()
const userGetProfileApplication=new GetUserProfileUseCase(userGetProfileRepo)
const userEditProfileRepo=new EditProfileRepository()
const editUserProfileApplication=new EditUserProfileUseCase(userEditProfileRepo)

const userProfileController=new UserProfileController(
    userAddProfileApplication,
    userGetProfileApplication,
    editUserProfileApplication

)

const getLawyerRepo=new GetLawyerRepository()

const getLawyerApplication=new GetLawyerUseCase(getLawyerRepo)
const getLawyerDetailsApplication=new GetLawyerDetailsUseCase(getLawyerRepo)
const getLawyerSlotRepo=new GetLawyerSlotRepository()
const getLawyerSlotApplication=new GetLawyerSlotUseCase(getLawyerSlotRepo)
const filterLawyerApplication=new FilterLawyerUseCase(getLawyerRepo)
const searchLawyerApplication=new SearchLawyerUseCase(getLawyerRepo)
const bookAppointmentRepo=new BookAppointmentRepository()
const bookAppointmentApplication=new BookAppointmentUseCase(bookAppointmentRepo)

const userController=new UserController(
    getLawyerApplication,
    getLawyerDetailsApplication,
    getLawyerSlotApplication,
    filterLawyerApplication,
    searchLawyerApplication,
    bookAppointmentApplication
)

router.post('/signup',(req,res)=>userAuthController.registerUser(req,res))

router.post('/otp-verification',(req,res)=>userAuthController.verifyOtp(req,res))

router.post('/resend-otp',(req,res)=>userAuthController.resendOtp(req,res))

router.post('/forgot-password',(req,res)=>userAuthController.forgotPassword(req,res))

router.post('/change-password',(req,res)=>userAuthController.changePassword(req,res))

router.post('/signin',(req,res)=>userAuthController.signin(req,res,cookieTokenService))

router.get("/auth/google",passport.authenticate("google", {scope: ["profile", "email"],session:false}))

router.get("/auth/google/callback",passport.authenticate("google", { session: false, failureRedirect: "http://localhost:5173/googleFail" }),(req, res) => userAuthController.googleAuthentication(req, res, cookieTokenService));

router.get('/getGoogleAuthDetails',(req,res)=>userAuthController.getGoogleAuthDetails(req,res))

router.post('/logout',(req,res)=>userAuthController.logout(req,res))

router.post('/reset-password',verifyToken,verifyRole(['user']),verifyAccountStatus(checkUserAccountStatusMongoRepo),(req,res)=>userAuthController.resetPassword(req,res))

router.post('/add-profile',verifyToken,verifyRole(['user']),verifyAccountStatus(checkUserAccountStatusMongoRepo),upload.single('profileImage'),(req,res)=>userProfileController.addProfile(req,res))

router.get('/get-profile/:userId',verifyToken,verifyRole(['user']),verifyAccountStatus(checkUserAccountStatusMongoRepo),(req,res)=>userProfileController.getUserProfile(req,res))

router.put('/edit-profile',verifyToken,verifyRole(['user']),verifyAccountStatus(checkUserAccountStatusMongoRepo),upload.single('profileImage'),(req,res)=>userProfileController.editUserProfile(req,res))

router.get('/get-lawyers',verifyToken,verifyRole(['user']),verifyAccountStatus(checkUserAccountStatusMongoRepo),(req,res)=>userController.getLawyers(req,res))

router.get('/get-lawyer-details/:lawyerId',verifyToken,verifyRole(['user']),verifyAccountStatus(checkUserAccountStatusMongoRepo),(req,res)=>userController.getLawyerDetails(req,res))

router.get('/get-slot-details/:lawyerId/:date',verifyToken,verifyRole(['user']),verifyAccountStatus(checkUserAccountStatusMongoRepo),(req,res)=>userController.getSlotDetails(req,res))

router.get('/filter-lawyer/:specialization',verifyToken,verifyRole(['user']),verifyAccountStatus(checkUserAccountStatusMongoRepo),(req,res)=>userController.filterLawyerBySpecialization(req,res))

router.get('/search-lawyer/:name',verifyToken,verifyRole(['user']),verifyAccountStatus(checkUserAccountStatusMongoRepo),(req,res)=>userController.searchLawyerByName(req,res))

router.post('/book-appointment',verifyToken,verifyRole(['user']),verifyAccountStatus(checkUserAccountStatusMongoRepo),(req,res)=>userController.bookAppointment(req,res))

export default router;