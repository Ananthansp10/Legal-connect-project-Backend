"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController =
  exports.lawyerController =
  exports.lawyerProfileController =
  exports.lawyerAuthController =
  exports.authCookieService =
    void 0;
const lawyerSignupRepository_1 = require("../module/auth/lawyerAuth/infrastructure/repository/lawyerSignupRepository");
const lawyerSignupUseCase_1 = require("../module/auth/lawyerAuth/application/lawyer-use-case/lawyerSignupUseCase");
const hashService_1 = require("../module/auth/userAuth/infrastructure/services/hashService");
const lawyerSigninRepository_1 = require("../module/auth/lawyerAuth/infrastructure/repository/lawyerSigninRepository");
const lawyerSigninUseCase_1 = require("../module/auth/lawyerAuth/application/lawyer-use-case/lawyerSigninUseCase");
const tokenGenerationService_1 = require("../module/auth/userAuth/infrastructure/services/tokenGenerationService");
const cookieTokenService_1 = require("../module/auth/userAuth/infrastructure/services/cookieTokenService");
const lawyerForgotPasswordUseCase_1 = require("../module/auth/lawyerAuth/application/lawyer-use-case/lawyerForgotPasswordUseCase");
const forgotPaaswordEmailService_1 = require("../module/auth/lawyerAuth/infrastructure/service/forgotPaaswordEmailService");
const forgotPasswordTokenGeneration_1 = require("../module/auth/lawyerAuth/infrastructure/service/forgotPasswordTokenGeneration");
const lawyerChangePasswordUseCase_1 = require("../module/auth/lawyerAuth/application/lawyer-use-case/lawyerChangePasswordUseCase");
const changePasswordRepository_1 = require("../module/auth/lawyerAuth/infrastructure/repository/changePasswordRepository");
const lawyerResetPasswordUseCase_1 = require("../module/auth/lawyerAuth/application/lawyer-use-case/lawyerResetPasswordUseCase");
const lawyerProfileManagementController_1 = require("../module/lawyer/interface/controller/lawyerProfileManagementController");
const lawyerAddProfileRepository_1 = require("../module/lawyer/infrastructure/repository/lawyerAddProfileRepository");
const lawyerAddProfileUseCase_1 = require("../module/lawyer/application/use-case/lawyerAddProfileUseCase");
const getLawyerProfileRepository_1 = require("../module/lawyer/infrastructure/repository/getLawyerProfileRepository");
const getLawyerProfileUseCase_1 = require("../module/lawyer/application/use-case/getLawyerProfileUseCase");
const editLawyerProfileRepository_1 = require("../module/lawyer/infrastructure/repository/editLawyerProfileRepository");
const editLawyerProfileUseCase_1 = require("../module/lawyer/application/use-case/editLawyerProfileUseCase");
const addSlotRepository_1 = require("../module/lawyer/infrastructure/repository/addSlotRepository");
const addSlotUseCase_1 = require("../module/lawyer/application/use-case/addSlotUseCase");
const lawyerController_1 = require("../module/lawyer/interface/controller/lawyerController");
const getSlotRepository_1 = require("../module/lawyer/infrastructure/repository/getSlotRepository");
const getSlotUseCase_1 = require("../module/lawyer/application/use-case/getSlotUseCase");
const updateRuleStatusRepository_1 = require("../module/lawyer/infrastructure/repository/updateRuleStatusRepository");
const updateRuleStatusUseCase_1 = require("../module/lawyer/application/use-case/updateRuleStatusUseCase");
const appointmentRepository_1 = require("../module/lawyer/infrastructure/repository/appointmentRepository");
const getAppointmentUseCase_1 = require("../module/lawyer/application/use-case/getAppointmentUseCase");
const updateAppointmentStatusUseCase_1 = require("../module/lawyer/application/use-case/updateAppointmentStatusUseCase");
const getLawyerProfileImageUseCase_1 = require("../module/lawyer/application/use-case/getLawyerProfileImageUseCase");
const subscriptionPlanRepository_1 = require("../module/lawyer/infrastructure/repository/subscriptionPlanRepository");
const getSubscriptionPlanUseCase_1 = require("../module/lawyer/application/use-case/getSubscriptionPlanUseCase");
const planRepository_1 = require("../module/lawyer/infrastructure/repository/planRepository");
const paymentController_1 = require("../module/lawyer/interface/controller/paymentController");
const createRazorpayOrderUseCase_1 = require("../module/lawyer/application/use-case/createRazorpayOrderUseCase");
const verifyRazorpayPaymentUseCase_1 = require("../module/lawyer/application/use-case/verifyRazorpayPaymentUseCase");
const addPlanUseCase_1 = require("../module/lawyer/application/use-case/addPlanUseCase");
const lawyerChatRepository_1 = require("../module/lawyer/infrastructure/repository/lawyerChatRepository");
const getLawyerAllChatUseCase_1 = require("../module/lawyer/application/use-case/getLawyerAllChatUseCase");
const getLawyerChatUseCase_1 = require("../module/lawyer/application/use-case/getLawyerChatUseCase");
const getUserChatProfileUseCase_1 = require("../module/lawyer/application/use-case/getUserChatProfileUseCase");
const updateReadStatusUseCase_1 = require("../module/lawyer/application/use-case/updateReadStatusUseCase");
const bankDetailsRepository_1 = require("../module/lawyer/infrastructure/repository/bankDetailsRepository");
const addBankAccountDetailsUseCase_1 = require("../module/lawyer/application/use-case/addBankAccountDetailsUseCase");
const summaryRepository_1 = require("../module/lawyer/infrastructure/repository/summaryRepository");
const getSummaryUseCase_1 = require("../module/lawyer/application/use-case/getSummaryUseCase");
const checkBankDetailsUseCase_1 = require("../module/lawyer/application/use-case/checkBankDetailsUseCase");
const startMeetingUseCase_1 = require("../module/lawyer/application/use-case/startMeetingUseCase");
const addNotesUseCase_1 = require("../module/lawyer/application/use-case/addNotesUseCase");
const addReviewUseCase_1 = require("../module/lawyer/application/use-case/addReviewUseCase");
const getConsultationHistoryUseCase_1 = require("../module/lawyer/application/use-case/getConsultationHistoryUseCase");
const lawyerAuthController_1 = require("../module/auth/lawyerAuth/interface/controller/lawyerAuthController");
const findStarterPlanUseCase_1 = require("../module/lawyer/application/use-case/findStarterPlanUseCase");
const searchAppointmentUseCase_1 = require("../module/lawyer/application/use-case/searchAppointmentUseCase");
const getPurchasedPlansUseCase_1 = require("../module/lawyer/application/use-case/getPurchasedPlansUseCase");
const lawyerSignupMongoRepo =
  new lawyerSignupRepository_1.LawyerSignupRepository();
const hashService = new hashService_1.HashService();
const lawyerSignupApplication = new lawyerSignupUseCase_1.LawyerSignupUseCase(
  lawyerSignupMongoRepo,
  hashService,
);
const lawyerSigninMongoRepo =
  new lawyerSigninRepository_1.LawyerSigninRepository();
const tokenGenerationService =
  new tokenGenerationService_1.TokenGenerationService();
exports.authCookieService = new cookieTokenService_1.CookieTokenService();
const lawyerSigninApplication = new lawyerSigninUseCase_1.LawyerSigninUseCase(
  lawyerSigninMongoRepo,
  tokenGenerationService,
);
const emailService =
  new forgotPaaswordEmailService_1.ForgotPasswordEmailService();
const forgotPasswordTokenGenerateService =
  new forgotPasswordTokenGeneration_1.ForgotPasswordTokenGeneration();
const forgotPasswordAplication =
  new lawyerForgotPasswordUseCase_1.LawyerForgotPasswordUseCase(
    emailService,
    forgotPasswordTokenGenerateService,
    lawyerSignupMongoRepo,
  );
const lawyerChangePasswordRepo =
  new changePasswordRepository_1.ChangePasswordRepository();
const changePasswordApplication =
  new lawyerChangePasswordUseCase_1.LawyerChangePasswordUseCase(
    lawyerChangePasswordRepo,
    hashService,
  );
const resetPasswordApplication =
  new lawyerResetPasswordUseCase_1.LawyerResetPasswordUseCase(
    lawyerChangePasswordRepo,
    hashService,
  );
exports.lawyerAuthController = new lawyerAuthController_1.LawyerAuthController(
  lawyerSignupApplication,
  lawyerSigninApplication,
  forgotPasswordAplication,
  changePasswordApplication,
  resetPasswordApplication,
);
const lawyerAddProfileRepo =
  new lawyerAddProfileRepository_1.LawyerAddProfileRepository();
const lawyerAddProfileApplication =
  new lawyerAddProfileUseCase_1.LawyerAddProfileUseCase(lawyerAddProfileRepo);
const getLawyerProfileMongoRepo =
  new getLawyerProfileRepository_1.GetLawyerProfileRepository();
const getLawyerProfileApplication =
  new getLawyerProfileUseCase_1.GetLawyerProfileUseCase(
    getLawyerProfileMongoRepo,
  );
const editLawyerProfileMongoRepo =
  new editLawyerProfileRepository_1.EditLawyerProfileRepository();
const lawyerEditProfileApplication =
  new editLawyerProfileUseCase_1.LawyerEditProfileUseCase(
    editLawyerProfileMongoRepo,
  );
const getLawyerProfileImageUseCase =
  new getLawyerProfileImageUseCase_1.GetLawyerProfileImageUseCase(
    getLawyerProfileMongoRepo,
  );
exports.lawyerProfileController =
  new lawyerProfileManagementController_1.LawyerProfileController(
    lawyerAddProfileApplication,
    getLawyerProfileApplication,
    lawyerEditProfileApplication,
    getLawyerProfileImageUseCase,
  );
const addSlotMongoRepo = new addSlotRepository_1.AddSlotRepository();
const addSlotApplication = new addSlotUseCase_1.AddSlotUseCase(
  addSlotMongoRepo,
);
const getSlotMongoRepo = new getSlotRepository_1.GetSlotRepository();
const getSlotApplication = new getSlotUseCase_1.GetSlotUseCase(
  getSlotMongoRepo,
);
const updateRuleMongoRepo =
  new updateRuleStatusRepository_1.UpdateRuleStatusRepository();
const updateRuleStatusApplication =
  new updateRuleStatusUseCase_1.UpdateRuleStatusUseCase(updateRuleMongoRepo);
const appointmentRepo = new appointmentRepository_1.AppointmentRepository();
const getAppointmentUseCase = new getAppointmentUseCase_1.GetAppointmentUseCase(
  appointmentRepo,
);
const planRepo = new planRepository_1.PlanRepository();
const bankDetailsRepo = new bankDetailsRepository_1.BankDetailsRepository();
const updateAppointmentStatusUseCase =
  new updateAppointmentStatusUseCase_1.UpdateAppointmentStatusUseCase(
    appointmentRepo,
    planRepo,
    bankDetailsRepo,
  );
const subscriptionPlanRepo =
  new subscriptionPlanRepository_1.SubscriptionPlanRepository();
const getSubscriptionPlanUseCase =
  new getSubscriptionPlanUseCase_1.GetSubscriptionPlanUseCase(
    subscriptionPlanRepo,
  );
const addPlanUseCase = new addPlanUseCase_1.AddPlanUseCase(planRepo);
const chatRepo = new lawyerChatRepository_1.LawyerChatRepository();
const getLawyerAllChatsUseCase =
  new getLawyerAllChatUseCase_1.GetLawyerAllChatUseCase(chatRepo);
const getLawyerChatUseCase = new getLawyerChatUseCase_1.GetLawyerChatUseCase(
  chatRepo,
);
const getUserChatProfileUseCase =
  new getUserChatProfileUseCase_1.GetUserChatProfileUseCase(chatRepo);
const updateChatReadStatusUseCase =
  new updateReadStatusUseCase_1.UpdateReadStatusUseCase(chatRepo);
const addBankDetailsUseCase =
  new addBankAccountDetailsUseCase_1.AddBankAccountDetailsUseCase(
    bankDetailsRepo,
  );
const summaryRepo = new summaryRepository_1.SummaryRepository();
const getSummaryUseCase = new getSummaryUseCase_1.GetSummaryUseCase(
  summaryRepo,
);
const checkBankDetailsUseCase =
  new checkBankDetailsUseCase_1.CheckBankDetailsUseCase(bankDetailsRepo);
const startMeetingUseCase = new startMeetingUseCase_1.StartMeetingUseCase(
  appointmentRepo,
);
const addNotesUseCase = new addNotesUseCase_1.AddNotesUseCase(appointmentRepo);
const addFeedbackUseCase = new addReviewUseCase_1.AddReviewUseCase(
  appointmentRepo,
);
const getConsultationHistoryUseCase =
  new getConsultationHistoryUseCase_1.GetConsultationHistoryUseCase(
    appointmentRepo,
  );
const findStarterPlanUseCase =
  new findStarterPlanUseCase_1.FindStarterPlanUseCase(planRepo);
const searchAppointmentUseCase =
  new searchAppointmentUseCase_1.SearchAppointmentUseCase(appointmentRepo);
const getPurchasedPlansUseCase =
  new getPurchasedPlansUseCase_1.GetPurchasedPlansUseCase(planRepo);
exports.lawyerController = new lawyerController_1.LawyerController(
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
  searchAppointmentUseCase,
  getPurchasedPlansUseCase,
);
const createRazorpayOrderUseCase =
  new createRazorpayOrderUseCase_1.CreateRazorpayOrderUseCase();
const verifyRazorpayPaymentUseCase =
  new verifyRazorpayPaymentUseCase_1.VerifyRazorpayPaymentUseCase();
exports.paymentController = new paymentController_1.PaymentController(
  createRazorpayOrderUseCase,
  verifyRazorpayPaymentUseCase,
);
