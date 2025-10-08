import express from "express";
import {
  LawyerAuthController,
  MulterRequest,
} from "../module/auth/lawyerAuth/interface/controller/lawyerAuthController";
import { LawyerSignupRepository } from "../module/auth/lawyerAuth/infrastructure/repository/lawyerSignupRepository";
import { LawyerSignupUseCase } from "../module/auth/lawyerAuth/application/lawyer-use-case/lawyerSignupUseCase";
import { HashService } from "../module/auth/userAuth/infrastructure/services/hashService";
import upload from "../config/multerConfig";
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
import { verifyToken } from "../middlewares/verifyTokenMiddleware";
import { verifyRole } from "../middlewares/verifyRoleMiddleware";
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
import { GetUserProfileUseCase } from "../module/user/application/use-case/getUserProfileUseCase";
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
const router = express.Router();

const lawyerSignupMongoRepo = new LawyerSignupRepository();
const hashService = new HashService();
const lawyerSignupApplication = new LawyerSignupUseCase(
  lawyerSignupMongoRepo,
  hashService,
);
const lawyerSigninMongoRepo = new LawyerSigninRepository();
const tokenGenerationService = new TokenGenerationService();
const authCookieService = new CookieTokenService();
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

const lawyerAuthController = new LawyerAuthController(
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

const lawyerProfileController = new LawyerProfileController(
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

const lawyerController = new LawyerController(
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
);

const createRazorpayOrderUseCase = new CreateRazorpayOrderUseCase();
const verifyRazorpayPaymentUseCase = new VerifyRazorpayPaymentUseCase();

const paymentController = new PaymentController(
  createRazorpayOrderUseCase,
  verifyRazorpayPaymentUseCase,
);

router.post("/signup", upload.array("files", 2), (req, res) =>
  lawyerAuthController.registerLawyer(req as MulterRequest, res),
);

router.post("/signin", (req, res) =>
  lawyerAuthController.siginLawyer(req, res, authCookieService),
);

router.post("/logout", (req, res) => lawyerAuthController.logout(req, res));

router.post("/forgot-password-email", (req, res) =>
  lawyerAuthController.forgotPassword(req, res),
);

router.post("/new-password", (req, res) =>
  lawyerAuthController.changePassword(req, res),
);

router.post(
  "/reset-password",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerAuthController.resetPassword(req, res),
);

router.post(
  "/add-profile",
  verifyToken,
  verifyRole(["lawyer"]),
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "barCouncilCertificate", maxCount: 1 },
    { name: "degreeCertificate", maxCount: 1 },
    { name: "experienceCertificate", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
  ]),
  (req, res) => lawyerProfileController.addLawyerProfile(req, res),
);

router.get(
  "/get-profile/:lawyerId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerProfileController.getLawyerProfile(req, res),
);

router.patch(
  "/edit-profile",
  verifyToken,
  verifyRole(["lawyer"]),
  upload.single("profileImage"),
  (req, res) => lawyerProfileController.editLawyerProfile(req, res),
);

router.post(
  "/add-slot/:lawyerId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.addSlot(req, res),
);

router.get(
  "/get-slots/:lawyerId/:type",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getSlot(req, res),
);

router.patch(
  "/update-rule-status/:ruleId/:ruleStatus",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.updateRuleStatus(req, res),
);

router.get(
  "/get-appointments/:lawyerId/:appointmentStatus/:startIndex/:limit",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getAppointments(req, res),
);

router.patch(
  "/appointment/:appointmentId/:appointmentStatus/:lawyerId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.updateAppointmentStatus(req, res),
);

router.get(
  "/get-profile-image/:lawyerId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerProfileController.getLawyerProfileImage(req, res),
);

router.get(
  "/subscription-plans",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getSubscriptionPlan(req, res),
);

router.post(
  "/create-razorpay-order",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => paymentController.createRazorpayOrder(req, res),
);

router.post(
  "/verify-payment",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => paymentController.verifyPayment(req, res),
);

router.post(
  "/add-plan/:lawyerId/:planId/:price",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.addPlan(req, res),
);

router.get(
  "/get-all-chats/:lawyerId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getAllChats(req, res),
);

router.get(
  "/get-chat/:lawyerId/:userId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getChat(req, res),
);

router.get(
  "/get-user-chat-profile/:userId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getUserChatProfile(req, res),
);

router.post(
  "/update-chat-read-status/:lawyerId/:userId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.updateChatReadStatus(req, res),
);

router.post(
  "/add-bank-account",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.addBankAccount(req, res),
);

router.get(
  "/get-summary/:lawyerId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getSummary(req, res),
);

router.get(
  "/check-bank-details/:lawyerId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.checkBankDetails(req, res),
);

router.post(
  "/start-meeting/:appointmentId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.startMeeting(req, res),
);

router.post(
  "/add-notes/:appointmentId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.addNotes(req, res),
);

router.post(
  "/add-feedback/:appointmentId",
  verifyToken,
  verifyRole(["lawyer","user"]),
  (req, res) => lawyerController.addReview(req, res),
);

router.get(
  "/get-consultation-history/:caseId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getConsultationHistory(req, res),
);

export default router;
