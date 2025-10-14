import { UserSignupRepository } from "../module/auth/userAuth/infrastructure/repository/userSignupRepository";
import { UserSignupUseCase } from "../module/auth/userAuth/application/use-cases/userSignupUseCase";
import { UserAuthController } from "../module/auth/userAuth/interface/controller/userAuthController";
import { SendOtpMailService } from "../module/auth/userAuth/infrastructure/services/sendOtpMailService";
import { GenerateOtpService } from "../module/auth/userAuth/infrastructure/services/generateOtpService";
import { HashService } from "../module/auth/userAuth/infrastructure/services/hashService";
import { OtpService } from "../module/auth/userAuth/infrastructure/services/saveOtp";
import { OtpVerificationRepository } from "../module/auth/userAuth/infrastructure/repository/otpVerificationRepository";
import { OtpVerificationUseCase } from "../module/auth/userAuth/application/use-cases/otpVerificationUseCase";
import { ResendOtpUseCase } from "../module/auth/userAuth/application/use-cases/resendOtpUseCase";
import { ForgotPasswordUseCase } from "../module/auth/userAuth/application/use-cases/forgotPasswordUseCase";
import { ChangePasswordUseCase } from "../module/auth/userAuth/application/use-cases/changePasswordUseCase";
import { ForgotPasswordRepository } from "../module/auth/userAuth/infrastructure/repository/forgotPasswordRepository";
import { UserSigninRepository } from "../module/auth/userAuth/infrastructure/repository/userSigninRepository";
import { TokenGenerationService } from "../module/auth/userAuth/infrastructure/services/tokenGenerationService";
import { UserSigninUseCase } from "../module/auth/userAuth/application/use-cases/userSigninUseCase";
import { CookieTokenService } from "../module/auth/userAuth/infrastructure/services/cookieTokenService";
import { GoogleAuthRepository } from "../module/auth/userAuth/infrastructure/repository/googleAuthRepository";
import { GoogleAuthUseCase } from "../module/auth/userAuth/application/use-cases/googleAuthUseCase";
import { ResetPasswordRepository } from "../module/auth/userAuth/infrastructure/repository/resetPasswordRepository";
import { ResetPasswordUseCase } from "../module/auth/userAuth/application/use-cases/resetPasswordUseCase";
import { UserProfileController } from "../module/user/interface/controller/userProfileController";
import { AddProfileUseCase } from "../module/user/application/use-case/addProfileUseCase";
import { UserProfileRepository } from "../module/user/infrastructure/repository/userProfileRepository";
import { GetUserProfileUseCase } from "../module/user/application/use-case/getUserProfileUseCase";
import { GetProfileRepository } from "../module/user/infrastructure/repository/getProfileRepository";
import { EditProfileRepository } from "../module/user/infrastructure/repository/editProfileRepository";
import { EditUserProfileUseCase } from "../module/user/application/use-case/editUserProfileUseCase";
import { UserController } from "../module/user/interface/controller/userController";
import { GetLawyerRepository } from "../module/user/infrastructure/repository/getLawyersRepository";
import { GetLawyerUseCase } from "../module/user/application/use-case/getLawyersUseCase";
import { GetLawyerDetailsUseCase } from "../module/user/application/use-case/getLawyerDetailsUseCase";
import { GetLawyerSlotRepository } from "../module/user/infrastructure/repository/getLawyerSlotRepository";
import { GetLawyerSlotUseCase } from "../module/user/application/use-case/getLawyerSlotUseCase";
import { FilterLawyerUseCase } from "../module/user/application/use-case/filterLawyerUseCase";
import { SearchLawyerUseCase } from "../module/user/application/use-case/searchLawyerUseCase";
import { AppointmentRepository } from "../module/user/infrastructure/repository/appointmentRepository";
import { BookAppointmentUseCase } from "../module/user/application/use-case/bookAppointmentUseCase";
import { BookAppointmentRepository } from "../module/user/infrastructure/repository/bookAppointmentRepository";
import { GetAppointmentUseCase } from "../module/user/application/use-case/getAppointmentUseCase";
import { PaymentController } from "../module/user/interface/controller/paymentController";
import { CreateRazorpayOrderUseCase } from "../module/user/application/use-case/createRazorpayOrderUseCase";
import { VerifyPaymentUseCase } from "../module/user/application/use-case/verifyPaymentUseCase";
import { CancelAppointmentUseCase } from "../module/user/application/use-case/cancelAppointmentUseCase";
import { GetTodaysAppointmentsUseCase } from "../module/user/application/use-case/getTodaysAppointmentUseCase";
import { ResheduleAppointmentUseCase } from "../module/user/application/use-case/resheduleAppointmentUseCase";
import { ReportRepository } from "../module/user/infrastructure/repository/reportRepository";
import { ReportLawyerUseCase } from "../module/user/application/use-case/reportLawyerUseCase";
import { ChatRepository } from "../module/user/infrastructure/repository/chatRepository";
import { GetUserChatUseCase } from "../module/user/application/use-case/getUserChatUseCase";
import { GetAllChatUseCase } from "../module/user/application/use-case/getAllChatUseCase";
import { GetLawyerChatProfileUseCase } from "../module/user/application/use-case/getLawyerChatProfileUseCase";
import { RefundPayment } from "../module/user/infrastructure/services/refundPaymentService";
import { FeedbackRepository } from "../module/user/infrastructure/repository/feedbackRepository";
import { AddReviewUseCase } from "../module/user/application/use-case/addReviewUseCase";
import { GetReviewUseCase } from "../module/user/application/use-case/getReviewUseCase";
import { BankDetailsRepository } from "../module/user/infrastructure/repository/bankDetailsRepository";
import { CheckAccountStatusRepository } from "../module/auth/userAuth/infrastructure/repository/checkAccountStatusRepository";

const userSignupMongoRepo = new UserSignupRepository();
const otpsendEmail = new SendOtpMailService();
const generateOtp = new GenerateOtpService();
const hashData = new HashService();
const otpService = new OtpService();
const otpMongoRepo = new OtpVerificationRepository();
const otpVerificationUseCase = new OtpVerificationUseCase(
  otpMongoRepo,
  userSignupMongoRepo,
);
const userSignupApplication = new UserSignupUseCase(
  userSignupMongoRepo,
  otpsendEmail,
  generateOtp,
  hashData,
  otpService,
);
const resendOtpApplication = new ResendOtpUseCase(
  otpService,
  generateOtp,
  hashData,
  otpsendEmail,
);
const forgotPasswordApplication = new ForgotPasswordUseCase(
  otpService,
  generateOtp,
  hashData,
  otpsendEmail,
);
const forgotPasswordRepo = new ForgotPasswordRepository();
const changePasswordApplication = new ChangePasswordUseCase(
  forgotPasswordRepo,
  hashData,
);
const userSigninMongoRepo = new UserSigninRepository();
const tokenGenerationService = new TokenGenerationService();
const userSigninApplication = new UserSigninUseCase(
  userSigninMongoRepo,
  tokenGenerationService,
);
export const cookieTokenService = new CookieTokenService();

const googleAuthMongoRepo = new GoogleAuthRepository();
const googleAuthApplication = new GoogleAuthUseCase(
  googleAuthMongoRepo,
  tokenGenerationService,
);
const resetPasswordMongoRepo = new ResetPasswordRepository();
const resetPasswordApplication = new ResetPasswordUseCase(
  resetPasswordMongoRepo,
  hashData,
);

export const checkUserAccountStatusMongoRepo =
  new CheckAccountStatusRepository();

export const userAuthController = new UserAuthController(
  userSignupApplication,
  otpVerificationUseCase,
  resendOtpApplication,
  forgotPasswordApplication,
  changePasswordApplication,
  userSigninApplication,
  googleAuthApplication,
  resetPasswordApplication,
);

const userProfileRepo = new UserProfileRepository();

const userAddProfileApplication = new AddProfileUseCase(userProfileRepo);
const userGetProfileRepo = new GetProfileRepository();
const userGetProfileApplication = new GetUserProfileUseCase(userGetProfileRepo);
const userEditProfileRepo = new EditProfileRepository();
const editUserProfileApplication = new EditUserProfileUseCase(
  userEditProfileRepo,
);

export const userProfileController = new UserProfileController(
  userAddProfileApplication,
  userGetProfileApplication,
  editUserProfileApplication,
);

const getLawyerRepo = new GetLawyerRepository();

const getLawyerApplication = new GetLawyerUseCase(getLawyerRepo);
const getLawyerDetailsApplication = new GetLawyerDetailsUseCase(getLawyerRepo);
const getLawyerSlotRepo = new GetLawyerSlotRepository();
const getLawyerSlotApplication = new GetLawyerSlotUseCase(getLawyerSlotRepo);
const filterLawyerApplication = new FilterLawyerUseCase(getLawyerRepo);
const searchLawyerApplication = new SearchLawyerUseCase(getLawyerRepo);
const bookAppointmentRepo = new BookAppointmentRepository();
const bookAppointmentApplication = new BookAppointmentUseCase(
  bookAppointmentRepo,
);
const appointmentRepo = new AppointmentRepository();
const getAppointmentUseCase = new GetAppointmentUseCase(appointmentRepo);
const refundPaymentService = new RefundPayment(appointmentRepo);
const cancelAppointmentUseCase = new CancelAppointmentUseCase(
  appointmentRepo,
  refundPaymentService,
);
const getTodaysAppointmentsUseCase = new GetTodaysAppointmentsUseCase(
  appointmentRepo,
);
const resheduleAppointmentUseCase = new ResheduleAppointmentUseCase(
  appointmentRepo,
);
const reportRepo = new ReportRepository();
const reportLawyerUseCase = new ReportLawyerUseCase(reportRepo);
const chatRepo = new ChatRepository();
const getUserChatUseCase = new GetUserChatUseCase(chatRepo);
const getUserAllChatUseCase = new GetAllChatUseCase(chatRepo);
const getLawyerChatProfileUseCase = new GetLawyerChatProfileUseCase(chatRepo);
const feedbackRepo = new FeedbackRepository();
const addReviewUseCase = new AddReviewUseCase(feedbackRepo);
const getReviewUseCase = new GetReviewUseCase(feedbackRepo);

export const userController = new UserController(
  getLawyerApplication,
  getLawyerDetailsApplication,
  getLawyerSlotApplication,
  filterLawyerApplication,
  searchLawyerApplication,
  bookAppointmentApplication,
  getAppointmentUseCase,
  cancelAppointmentUseCase,
  getTodaysAppointmentsUseCase,
  resheduleAppointmentUseCase,
  reportLawyerUseCase,
  getUserChatUseCase,
  getUserAllChatUseCase,
  getLawyerChatProfileUseCase,
  addReviewUseCase,
  getReviewUseCase,
);

const bankRepo = new BankDetailsRepository();

const createRazorpayOrderUseCase = new CreateRazorpayOrderUseCase(bankRepo);
const verifyPaymentUseCase = new VerifyPaymentUseCase(appointmentRepo);

export const paymentController = new PaymentController(
  createRazorpayOrderUseCase,
  verifyPaymentUseCase,
);
