import { LawyerSignupRepository } from "../module/auth/lawyerAuth/infrastructure/repository/lawyerSignupRepository";
import { LawyerSignupUseCase } from "../module/auth/lawyerAuth/application/lawyer-use-case/lawyerSignupUseCase";
import { HashService } from "../module/auth/userAuth/infrastructure/services/hashService";
import { LawyerSigninRepository } from "../module/auth/lawyerAuth/infrastructure/repository/lawyerSigninRepository";
import { LawyerSigninUseCase } from "../module/auth/lawyerAuth/application/lawyer-use-case/lawyerSigninUseCase";
import { TokenGenerationService } from "../module/auth/userAuth/infrastructure/services/tokenGenerationService";
import { CookieTokenService } from "../module/auth/userAuth/infrastructure/services/cookieTokenService";
import { LawyerForgotPasswordUseCase } from "../module/auth/lawyerAuth/application/lawyer-use-case/lawyerForgotPasswordUseCase";
import { ForgotPasswordEmailService } from "../module/auth/lawyerAuth/infrastructure/service/forgotPaaswordEmailService";
import { ForgotPasswordTokenGeneration } from "../module/auth/lawyerAuth/infrastructure/service/forgotPasswordTokenGeneration";
import { LawyerChangePasswordUseCase } from "../module/auth/lawyerAuth/application/lawyer-use-case/lawyerChangePasswordUseCase";
import { ChangePasswordRepository } from "../module/auth/lawyerAuth/infrastructure/repository/changePasswordRepository";
import { LawyerResetPasswordUseCase } from "../module/auth/lawyerAuth/application/lawyer-use-case/lawyerResetPasswordUseCase";
import { LawyerProfileController } from "../module/lawyer/interface/controller/lawyerProfileManagementController";
import { LawyerAddProfileRepository } from "../module/lawyer/infrastructure/repository/lawyerAddProfileRepository";
import { LawyerAddProfileUseCase } from "../module/lawyer/application/use-case/lawyerAddProfileUseCase";
import { GetLawyerProfileRepository } from "../module/lawyer/infrastructure/repository/getLawyerProfileRepository";
import { GetLawyerProfileUseCase } from "../module/lawyer/application/use-case/getLawyerProfileUseCase";
import { EditLawyerProfileRepository } from "../module/lawyer/infrastructure/repository/editLawyerProfileRepository";
import { LawyerEditProfileUseCase } from "../module/lawyer/application/use-case/editLawyerProfileUseCase";
import { AddSlotRepository } from "../module/lawyer/infrastructure/repository/addSlotRepository";
import { AddSlotUseCase } from "../module/lawyer/application/use-case/addSlotUseCase";
import { LawyerController } from "../module/lawyer/interface/controller/lawyerController";
import { GetSlotRepository } from "../module/lawyer/infrastructure/repository/getSlotRepository";
import { GetSlotUseCase } from "../module/lawyer/application/use-case/getSlotUseCase";
import { UpdateRuleStatusRepository } from "../module/lawyer/infrastructure/repository/updateRuleStatusRepository";
import { UpdateRuleStatusUseCase } from "../module/lawyer/application/use-case/updateRuleStatusUseCase";
import { AppointmentRepository } from "../module/lawyer/infrastructure/repository/appointmentRepository";
import { GetAppointmentUseCase } from "../module/lawyer/application/use-case/getAppointmentUseCase";
import { UpdateAppointmentStatusUseCase } from "../module/lawyer/application/use-case/updateAppointmentStatusUseCase";
import { GetLawyerProfileImageUseCase } from "../module/lawyer/application/use-case/getLawyerProfileImageUseCase";
import { SubscriptionPlanRepository } from "../module/lawyer/infrastructure/repository/subscriptionPlanRepository";
import { GetSubscriptionPlanUseCase } from "../module/lawyer/application/use-case/getSubscriptionPlanUseCase";
import { PlanRepository } from "../module/lawyer/infrastructure/repository/planRepository";
import { PaymentController } from "../module/lawyer/interface/controller/paymentController";
import { CreateRazorpayOrderUseCase } from "../module/lawyer/application/use-case/createRazorpayOrderUseCase";
import { VerifyRazorpayPaymentUseCase } from "../module/lawyer/application/use-case/verifyRazorpayPaymentUseCase";
import { AddPlanUseCase } from "../module/lawyer/application/use-case/addPlanUseCase";
import { LawyerChatRepository } from "../module/lawyer/infrastructure/repository/lawyerChatRepository";
import { GetLawyerAllChatUseCase } from "../module/lawyer/application/use-case/getLawyerAllChatUseCase";
import { GetLawyerChatUseCase } from "../module/lawyer/application/use-case/getLawyerChatUseCase";
import { GetUserChatProfileUseCase } from "../module/lawyer/application/use-case/getUserChatProfileUseCase";
import { UpdateReadStatusUseCase } from "../module/lawyer/application/use-case/updateReadStatusUseCase";
import { BankDetailsRepository } from "../module/lawyer/infrastructure/repository/bankDetailsRepository";
import { AddBankAccountDetailsUseCase } from "../module/lawyer/application/use-case/addBankAccountDetailsUseCase";
import { SummaryRepository } from "../module/lawyer/infrastructure/repository/summaryRepository";
import { GetSummaryUseCase } from "../module/lawyer/application/use-case/getSummaryUseCase";
import { CheckBankDetailsUseCase } from "../module/lawyer/application/use-case/checkBankDetailsUseCase";
import { StartMeetingUseCase } from "../module/lawyer/application/use-case/startMeetingUseCase";
import { AddNotesUseCase } from "../module/lawyer/application/use-case/addNotesUseCase";
import { AddReviewUseCase } from "../module/lawyer/application/use-case/addReviewUseCase";
import { GetConsultationHistoryUseCase } from "../module/lawyer/application/use-case/getConsultationHistoryUseCase";
import { LawyerAuthController } from "../module/auth/lawyerAuth/interface/controller/lawyerAuthController";
import { FindStarterPlanUseCase } from "../module/lawyer/application/use-case/findStarterPlanUseCase";

const lawyerSignupMongoRepo = new LawyerSignupRepository();
const hashService = new HashService();
const lawyerSignupApplication = new LawyerSignupUseCase(
  lawyerSignupMongoRepo,
  hashService,
);
const lawyerSigninMongoRepo = new LawyerSigninRepository();
const tokenGenerationService = new TokenGenerationService();
export const authCookieService = new CookieTokenService();
const lawyerSigninApplication = new LawyerSigninUseCase(
  lawyerSigninMongoRepo,
  tokenGenerationService,
);
const emailService = new ForgotPasswordEmailService();
const forgotPasswordTokenGenerateService = new ForgotPasswordTokenGeneration();
const forgotPasswordAplication = new LawyerForgotPasswordUseCase(
  emailService,
  forgotPasswordTokenGenerateService,
  lawyerSignupMongoRepo,
);
const lawyerChangePasswordRepo = new ChangePasswordRepository();
const changePasswordApplication = new LawyerChangePasswordUseCase(
  lawyerChangePasswordRepo,
  hashService,
);
const resetPasswordApplication = new LawyerResetPasswordUseCase(
  lawyerChangePasswordRepo,
  hashService,
);

export const lawyerAuthController = new LawyerAuthController(
  lawyerSignupApplication,
  lawyerSigninApplication,
  forgotPasswordAplication,
  changePasswordApplication,
  resetPasswordApplication,
);

const lawyerAddProfileRepo = new LawyerAddProfileRepository();
const lawyerAddProfileApplication = new LawyerAddProfileUseCase(
  lawyerAddProfileRepo,
);
const getLawyerProfileMongoRepo = new GetLawyerProfileRepository();
const getLawyerProfileApplication = new GetLawyerProfileUseCase(
  getLawyerProfileMongoRepo,
);
const editLawyerProfileMongoRepo = new EditLawyerProfileRepository();
const lawyerEditProfileApplication = new LawyerEditProfileUseCase(
  editLawyerProfileMongoRepo,
);
const getLawyerProfileImageUseCase = new GetLawyerProfileImageUseCase(
  getLawyerProfileMongoRepo,
);

export const lawyerProfileController = new LawyerProfileController(
  lawyerAddProfileApplication,
  getLawyerProfileApplication,
  lawyerEditProfileApplication,
  getLawyerProfileImageUseCase,
);

const addSlotMongoRepo = new AddSlotRepository();
const addSlotApplication = new AddSlotUseCase(addSlotMongoRepo);
const getSlotMongoRepo = new GetSlotRepository();
const getSlotApplication = new GetSlotUseCase(getSlotMongoRepo);
const updateRuleMongoRepo = new UpdateRuleStatusRepository();
const updateRuleStatusApplication = new UpdateRuleStatusUseCase(
  updateRuleMongoRepo,
);
const appointmentRepo = new AppointmentRepository();
const getAppointmentUseCase = new GetAppointmentUseCase(appointmentRepo);
const planRepo = new PlanRepository();
const bankDetailsRepo = new BankDetailsRepository();
const updateAppointmentStatusUseCase = new UpdateAppointmentStatusUseCase(
  appointmentRepo,
  planRepo,
  bankDetailsRepo,
);
const subscriptionPlanRepo = new SubscriptionPlanRepository();
const getSubscriptionPlanUseCase = new GetSubscriptionPlanUseCase(
  subscriptionPlanRepo,
);
const addPlanUseCase = new AddPlanUseCase(planRepo);
const chatRepo = new LawyerChatRepository();
const getLawyerAllChatsUseCase = new GetLawyerAllChatUseCase(chatRepo);
const getLawyerChatUseCase = new GetLawyerChatUseCase(chatRepo);
const getUserChatProfileUseCase = new GetUserChatProfileUseCase(chatRepo);
const updateChatReadStatusUseCase = new UpdateReadStatusUseCase(chatRepo);
const addBankDetailsUseCase = new AddBankAccountDetailsUseCase(bankDetailsRepo);
const summaryRepo = new SummaryRepository();
const getSummaryUseCase = new GetSummaryUseCase(summaryRepo);
const checkBankDetailsUseCase = new CheckBankDetailsUseCase(bankDetailsRepo);
const startMeetingUseCase = new StartMeetingUseCase(appointmentRepo);
const addNotesUseCase = new AddNotesUseCase(appointmentRepo);
const addFeedbackUseCase = new AddReviewUseCase(appointmentRepo);
const getConsultationHistoryUseCase = new GetConsultationHistoryUseCase(
  appointmentRepo,
);
const findStarterPlanUseCase = new FindStarterPlanUseCase(planRepo);

export const lawyerController = new LawyerController(
  addSlotApplication,
  getSlotApplication,
  updateRuleStatusApplication,
  getAppointmentUseCase,
  updateAppointmentStatusUseCase,
  getSubscriptionPlanUseCase,
  addPlanUseCase,
  getLawyerAllChatsUseCase,
  getLawyerChatUseCase,
  getUserChatProfileUseCase,
  updateChatReadStatusUseCase,
  addBankDetailsUseCase,
  getSummaryUseCase,
  checkBankDetailsUseCase,
  startMeetingUseCase,
  addNotesUseCase,
  addFeedbackUseCase,
  getConsultationHistoryUseCase,
  findStarterPlanUseCase,
);

const createRazorpayOrderUseCase = new CreateRazorpayOrderUseCase();
const verifyRazorpayPaymentUseCase = new VerifyRazorpayPaymentUseCase();

export const paymentController = new PaymentController(
  createRazorpayOrderUseCase,
  verifyRazorpayPaymentUseCase,
);
