import express from 'express'
import { UserSignupMongoRepositorie } from '../module/auth/userAuth/infrastructure/mongoRepositories/userSignupMongoRepositorie';
import { UserSignupApplication } from '../module/auth/userAuth/application/use-cases/userSignupApplication';
import { UserAuthController } from '../module/auth/userAuth/interface/controller/userAuthController';
import { sendOtpMailService } from '../module/auth/userAuth/infrastructure/services/sendOtpMailService';
import { GenerateOtpService } from '../module/auth/userAuth/infrastructure/services/generateOtpService';
import { HashService } from '../module/auth/userAuth/infrastructure/services/hashService';
import { OtpService } from '../module/auth/userAuth/infrastructure/services/saveOtp';
import { OtpVerificationMongoRepo } from '../module/auth/userAuth/infrastructure/mongoRepositories/otpVerificationMongoRepositories';
import { OtpVerificationApplication } from '../module/auth/userAuth/application/use-cases/otpVerificationApplication';
import { ResendOtpApplication } from '../module/auth/userAuth/application/use-cases/resendOtpApplication';
import { ForgotPasswordApplication } from '../module/auth/userAuth/application/use-cases/forgotPasswordApplication';
import { ChangePassword } from '../module/auth/userAuth/application/use-cases/changePasswordApplication';
import { ForgotPasswordMongoRepo } from '../module/auth/userAuth/infrastructure/mongoRepositories/forgotPasswordMongoRepo';
import { UserSigninMongoRepositorie } from '../module/auth/userAuth/infrastructure/mongoRepositories/userSigninMongoRepositorie';
import { TokenGenerationService } from '../module/auth/userAuth/infrastructure/services/tokenGenerationService';
import { UserSigninApplication } from '../module/auth/userAuth/application/use-cases/userSigninApplication';
import { CookieTokenService } from '../module/auth/userAuth/infrastructure/services/cookieTokenService';
const router=express.Router()
import passport from '../config/passport'
import { GoogleAuthMongoRepo } from '../module/auth/userAuth/infrastructure/mongoRepositories/googleAuthMongoRepositorie';
import { GoogleAuthApplication } from '../module/auth/userAuth/application/use-cases/googleAuthApplication';
import { ResetPasswordMongoRepositorie } from '../module/auth/userAuth/infrastructure/mongoRepositories/resetPasswordMongoRepositorie';
import { ResetPasswordApplication } from '../module/auth/userAuth/application/use-cases/resetPasswordApplication';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';
import { verifyRole } from '../middlewares/verifyRoleMiddleware';
import { verifyAccountStatus } from '../middlewares/verifyAccountStatus';
import { CheckAccountStatusMongoRepositorie } from '../module/auth/userAuth/infrastructure/mongoRepositories/checkAccountStatusMongoRepositorie';
import upload from '../config/multerConfig';
import { UserProfileController } from '../module/user/interface/controller/userProfileController';
import { AddProfileApplication } from '../module/user/application/use-case/addProfileApplication';
import { UserProfileRepository } from '../module/user/infrastructure/mongoRepository/userProfileMongoRepository';
import { GetUserProfileApplication } from '../module/user/application/use-case/getUserProfileApplication';
import { GetProfileRepository } from '../module/user/infrastructure/mongoRepository/getProfileMongoRepository';
import { EditProfileRepository } from '../module/user/infrastructure/mongoRepository/editProfileMongoRepository';
import { EditUserProfileApplication } from '../module/user/application/use-case/editUserProfileApplication';
import { UserController } from '../module/user/interface/controller/userController';
import { GetLawyerRepository } from '../module/user/infrastructure/mongoRepository/getLawyersMongoRepository';
import { GetLawyerApplication } from '../module/user/application/use-case/getLawyersApplication';
import { GetLawyerDetailsApplication } from '../module/user/application/use-case/getLawyerDetailsApplication';
import { GetLawyerSlotRepository } from '../module/user/infrastructure/mongoRepository/getLawyerSlotMongoRepository';
import { GetLawyerSlotApplication } from '../module/user/application/use-case/getLawyerSlotApplication';
import { FilterLawyerApplication } from '../module/user/application/use-case/filterLawyerApplication';
import { SearchLawyerApplication } from '../module/user/application/use-case/searchLawyerApplication';
import { BookAppointmentRepository } from '../module/user/infrastructure/mongoRepository/bookAppointmentMongoRepository';
import { BookAppointmentApplication } from '../module/user/application/use-case/bookAppointmentApplication';

const userSignupMongoRepo=new UserSignupMongoRepositorie()
const otpsendEmail=new sendOtpMailService()
const generateOtp=new GenerateOtpService()
const hashData=new HashService()
const otpService=new OtpService()
const otpMongoRepo=new OtpVerificationMongoRepo()
const OtpVerificationUseCase=new OtpVerificationApplication(otpMongoRepo,userSignupMongoRepo)
const userSignupApplication=new UserSignupApplication(userSignupMongoRepo,otpsendEmail,generateOtp,hashData,otpService)
const resendOtpApplication=new ResendOtpApplication(otpService,generateOtp,hashData,otpsendEmail)
const forgotPasswordApplication=new ForgotPasswordApplication(otpService,generateOtp,hashData,otpsendEmail)
const forgotPasswordRepo=new ForgotPasswordMongoRepo()
const changePasswordApplication=new ChangePassword(forgotPasswordRepo,hashData)
const userSigninMongoRepo=new UserSigninMongoRepositorie()
const tokenGenerationService=new TokenGenerationService()
const userSigninApplication=new UserSigninApplication(userSigninMongoRepo,tokenGenerationService)
const cookieTokenService=new CookieTokenService()
const googleAuthMongoRepo=new GoogleAuthMongoRepo()
const googleAuthApplication=new GoogleAuthApplication(googleAuthMongoRepo,tokenGenerationService)
const resetPasswordMongoRepo=new ResetPasswordMongoRepositorie()
const resetPasswordApplication=new ResetPasswordApplication(resetPasswordMongoRepo,hashData)
const checkUserAccountStatusMongoRepo=new CheckAccountStatusMongoRepositorie()



const userAuthController=new UserAuthController(
    userSignupApplication,
    OtpVerificationUseCase,
    resendOtpApplication,
    forgotPasswordApplication,
    changePasswordApplication,
    userSigninApplication,
    googleAuthApplication,
    resetPasswordApplication
)

const userProfileRepo=new UserProfileRepository()

const userAddProfileApplication=new AddProfileApplication(userProfileRepo)
const userGetProfileRepo=new GetProfileRepository()
const userGetProfileApplication=new GetUserProfileApplication(userGetProfileRepo)
const userEditProfileRepo=new EditProfileRepository()
const editUserProfileApplication=new EditUserProfileApplication(userEditProfileRepo)

const userProfileController=new UserProfileController(
    userAddProfileApplication,
    userGetProfileApplication,
    editUserProfileApplication

)

const getLawyerRepo=new GetLawyerRepository()

const getLawyerApplication=new GetLawyerApplication(getLawyerRepo)
const getLawyerDetailsApplication=new GetLawyerDetailsApplication(getLawyerRepo)
const getLawyerSlotRepo=new GetLawyerSlotRepository()
const getLawyerSlotApplication=new GetLawyerSlotApplication(getLawyerSlotRepo)
const filterLawyerApplication=new FilterLawyerApplication(getLawyerRepo)
const searchLawyerApplication=new SearchLawyerApplication(getLawyerRepo)
const bookAppointmentRepo=new BookAppointmentRepository()
const bookAppointmentApplication=new BookAppointmentApplication(bookAppointmentRepo)

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