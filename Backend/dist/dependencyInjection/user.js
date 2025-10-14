"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController =
  exports.userController =
  exports.userProfileController =
  exports.userAuthController =
  exports.checkUserAccountStatusMongoRepo =
  exports.cookieTokenService =
    void 0;
const userSignupRepository_1 = require("../module/auth/userAuth/infrastructure/repository/userSignupRepository");
const userSignupUseCase_1 = require("../module/auth/userAuth/application/use-cases/userSignupUseCase");
const userAuthController_1 = require("../module/auth/userAuth/interface/controller/userAuthController");
const sendOtpMailService_1 = require("../module/auth/userAuth/infrastructure/services/sendOtpMailService");
const generateOtpService_1 = require("../module/auth/userAuth/infrastructure/services/generateOtpService");
const hashService_1 = require("../module/auth/userAuth/infrastructure/services/hashService");
const saveOtp_1 = require("../module/auth/userAuth/infrastructure/services/saveOtp");
const otpVerificationRepository_1 = require("../module/auth/userAuth/infrastructure/repository/otpVerificationRepository");
const otpVerificationUseCase_1 = require("../module/auth/userAuth/application/use-cases/otpVerificationUseCase");
const resendOtpUseCase_1 = require("../module/auth/userAuth/application/use-cases/resendOtpUseCase");
const forgotPasswordUseCase_1 = require("../module/auth/userAuth/application/use-cases/forgotPasswordUseCase");
const changePasswordUseCase_1 = require("../module/auth/userAuth/application/use-cases/changePasswordUseCase");
const forgotPasswordRepository_1 = require("../module/auth/userAuth/infrastructure/repository/forgotPasswordRepository");
const userSigninRepository_1 = require("../module/auth/userAuth/infrastructure/repository/userSigninRepository");
const tokenGenerationService_1 = require("../module/auth/userAuth/infrastructure/services/tokenGenerationService");
const userSigninUseCase_1 = require("../module/auth/userAuth/application/use-cases/userSigninUseCase");
const cookieTokenService_1 = require("../module/auth/userAuth/infrastructure/services/cookieTokenService");
const googleAuthRepository_1 = require("../module/auth/userAuth/infrastructure/repository/googleAuthRepository");
const googleAuthUseCase_1 = require("../module/auth/userAuth/application/use-cases/googleAuthUseCase");
const resetPasswordRepository_1 = require("../module/auth/userAuth/infrastructure/repository/resetPasswordRepository");
const resetPasswordUseCase_1 = require("../module/auth/userAuth/application/use-cases/resetPasswordUseCase");
const userProfileController_1 = require("../module/user/interface/controller/userProfileController");
const addProfileUseCase_1 = require("../module/user/application/use-case/addProfileUseCase");
const userProfileRepository_1 = require("../module/user/infrastructure/repository/userProfileRepository");
const getUserProfileUseCase_1 = require("../module/user/application/use-case/getUserProfileUseCase");
const getProfileRepository_1 = require("../module/user/infrastructure/repository/getProfileRepository");
const editProfileRepository_1 = require("../module/user/infrastructure/repository/editProfileRepository");
const editUserProfileUseCase_1 = require("../module/user/application/use-case/editUserProfileUseCase");
const userController_1 = require("../module/user/interface/controller/userController");
const getLawyersRepository_1 = require("../module/user/infrastructure/repository/getLawyersRepository");
const getLawyersUseCase_1 = require("../module/user/application/use-case/getLawyersUseCase");
const getLawyerDetailsUseCase_1 = require("../module/user/application/use-case/getLawyerDetailsUseCase");
const getLawyerSlotRepository_1 = require("../module/user/infrastructure/repository/getLawyerSlotRepository");
const getLawyerSlotUseCase_1 = require("../module/user/application/use-case/getLawyerSlotUseCase");
const filterLawyerUseCase_1 = require("../module/user/application/use-case/filterLawyerUseCase");
const searchLawyerUseCase_1 = require("../module/user/application/use-case/searchLawyerUseCase");
const appointmentRepository_1 = require("../module/user/infrastructure/repository/appointmentRepository");
const bookAppointmentUseCase_1 = require("../module/user/application/use-case/bookAppointmentUseCase");
const bookAppointmentRepository_1 = require("../module/user/infrastructure/repository/bookAppointmentRepository");
const getAppointmentUseCase_1 = require("../module/user/application/use-case/getAppointmentUseCase");
const paymentController_1 = require("../module/user/interface/controller/paymentController");
const createRazorpayOrderUseCase_1 = require("../module/user/application/use-case/createRazorpayOrderUseCase");
const verifyPaymentUseCase_1 = require("../module/user/application/use-case/verifyPaymentUseCase");
const cancelAppointmentUseCase_1 = require("../module/user/application/use-case/cancelAppointmentUseCase");
const getTodaysAppointmentUseCase_1 = require("../module/user/application/use-case/getTodaysAppointmentUseCase");
const resheduleAppointmentUseCase_1 = require("../module/user/application/use-case/resheduleAppointmentUseCase");
const reportRepository_1 = require("../module/user/infrastructure/repository/reportRepository");
const reportLawyerUseCase_1 = require("../module/user/application/use-case/reportLawyerUseCase");
const chatRepository_1 = require("../module/user/infrastructure/repository/chatRepository");
const getUserChatUseCase_1 = require("../module/user/application/use-case/getUserChatUseCase");
const getAllChatUseCase_1 = require("../module/user/application/use-case/getAllChatUseCase");
const getLawyerChatProfileUseCase_1 = require("../module/user/application/use-case/getLawyerChatProfileUseCase");
const refundPaymentService_1 = require("../module/user/infrastructure/services/refundPaymentService");
const feedbackRepository_1 = require("../module/user/infrastructure/repository/feedbackRepository");
const addReviewUseCase_1 = require("../module/user/application/use-case/addReviewUseCase");
const getReviewUseCase_1 = require("../module/user/application/use-case/getReviewUseCase");
const bankDetailsRepository_1 = require("../module/user/infrastructure/repository/bankDetailsRepository");
const checkAccountStatusRepository_1 = require("../module/auth/userAuth/infrastructure/repository/checkAccountStatusRepository");
const userSignupMongoRepo = new userSignupRepository_1.UserSignupRepository();
const otpsendEmail = new sendOtpMailService_1.SendOtpMailService();
const generateOtp = new generateOtpService_1.GenerateOtpService();
const hashData = new hashService_1.HashService();
const otpService = new saveOtp_1.OtpService();
const otpMongoRepo =
  new otpVerificationRepository_1.OtpVerificationRepository();
const otpVerificationUseCase =
  new otpVerificationUseCase_1.OtpVerificationUseCase(
    otpMongoRepo,
    userSignupMongoRepo,
  );
const userSignupApplication = new userSignupUseCase_1.UserSignupUseCase(
  userSignupMongoRepo,
  otpsendEmail,
  generateOtp,
  hashData,
  otpService,
);
const resendOtpApplication = new resendOtpUseCase_1.ResendOtpUseCase(
  otpService,
  generateOtp,
  hashData,
  otpsendEmail,
);
const forgotPasswordApplication =
  new forgotPasswordUseCase_1.ForgotPasswordUseCase(
    otpService,
    generateOtp,
    hashData,
    otpsendEmail,
  );
const forgotPasswordRepo =
  new forgotPasswordRepository_1.ForgotPasswordRepository();
const changePasswordApplication =
  new changePasswordUseCase_1.ChangePasswordUseCase(
    forgotPasswordRepo,
    hashData,
  );
const userSigninMongoRepo = new userSigninRepository_1.UserSigninRepository();
const tokenGenerationService =
  new tokenGenerationService_1.TokenGenerationService();
const userSigninApplication = new userSigninUseCase_1.UserSigninUseCase(
  userSigninMongoRepo,
  tokenGenerationService,
);
exports.cookieTokenService = new cookieTokenService_1.CookieTokenService();
const googleAuthMongoRepo = new googleAuthRepository_1.GoogleAuthRepository();
const googleAuthApplication = new googleAuthUseCase_1.GoogleAuthUseCase(
  googleAuthMongoRepo,
  tokenGenerationService,
);
const resetPasswordMongoRepo =
  new resetPasswordRepository_1.ResetPasswordRepository();
const resetPasswordApplication =
  new resetPasswordUseCase_1.ResetPasswordUseCase(
    resetPasswordMongoRepo,
    hashData,
  );
exports.checkUserAccountStatusMongoRepo =
  new checkAccountStatusRepository_1.CheckAccountStatusRepository();
exports.userAuthController = new userAuthController_1.UserAuthController(
  userSignupApplication,
  otpVerificationUseCase,
  resendOtpApplication,
  forgotPasswordApplication,
  changePasswordApplication,
  userSigninApplication,
  googleAuthApplication,
  resetPasswordApplication,
);
const userProfileRepo = new userProfileRepository_1.UserProfileRepository();
const userAddProfileApplication = new addProfileUseCase_1.AddProfileUseCase(
  userProfileRepo,
);
const userGetProfileRepo = new getProfileRepository_1.GetProfileRepository();
const userGetProfileApplication =
  new getUserProfileUseCase_1.GetUserProfileUseCase(userGetProfileRepo);
const userEditProfileRepo = new editProfileRepository_1.EditProfileRepository();
const editUserProfileApplication =
  new editUserProfileUseCase_1.EditUserProfileUseCase(userEditProfileRepo);
exports.userProfileController =
  new userProfileController_1.UserProfileController(
    userAddProfileApplication,
    userGetProfileApplication,
    editUserProfileApplication,
  );
const getLawyerRepo = new getLawyersRepository_1.GetLawyerRepository();
const getLawyerApplication = new getLawyersUseCase_1.GetLawyerUseCase(
  getLawyerRepo,
);
const getLawyerDetailsApplication =
  new getLawyerDetailsUseCase_1.GetLawyerDetailsUseCase(getLawyerRepo);
const getLawyerSlotRepo =
  new getLawyerSlotRepository_1.GetLawyerSlotRepository();
const getLawyerSlotApplication =
  new getLawyerSlotUseCase_1.GetLawyerSlotUseCase(getLawyerSlotRepo);
const filterLawyerApplication = new filterLawyerUseCase_1.FilterLawyerUseCase(
  getLawyerRepo,
);
const searchLawyerApplication = new searchLawyerUseCase_1.SearchLawyerUseCase(
  getLawyerRepo,
);
const bookAppointmentRepo =
  new bookAppointmentRepository_1.BookAppointmentRepository();
const bookAppointmentApplication =
  new bookAppointmentUseCase_1.BookAppointmentUseCase(bookAppointmentRepo);
const appointmentRepo = new appointmentRepository_1.AppointmentRepository();
const getAppointmentUseCase = new getAppointmentUseCase_1.GetAppointmentUseCase(
  appointmentRepo,
);
const refundPaymentService = new refundPaymentService_1.RefundPayment(
  appointmentRepo,
);
const cancelAppointmentUseCase =
  new cancelAppointmentUseCase_1.CancelAppointmentUseCase(
    appointmentRepo,
    refundPaymentService,
  );
const getTodaysAppointmentsUseCase =
  new getTodaysAppointmentUseCase_1.GetTodaysAppointmentsUseCase(
    appointmentRepo,
  );
const resheduleAppointmentUseCase =
  new resheduleAppointmentUseCase_1.ResheduleAppointmentUseCase(
    appointmentRepo,
  );
const reportRepo = new reportRepository_1.ReportRepository();
const reportLawyerUseCase = new reportLawyerUseCase_1.ReportLawyerUseCase(
  reportRepo,
);
const chatRepo = new chatRepository_1.ChatRepository();
const getUserChatUseCase = new getUserChatUseCase_1.GetUserChatUseCase(
  chatRepo,
);
const getUserAllChatUseCase = new getAllChatUseCase_1.GetAllChatUseCase(
  chatRepo,
);
const getLawyerChatProfileUseCase =
  new getLawyerChatProfileUseCase_1.GetLawyerChatProfileUseCase(chatRepo);
const feedbackRepo = new feedbackRepository_1.FeedbackRepository();
const addReviewUseCase = new addReviewUseCase_1.AddReviewUseCase(feedbackRepo);
const getReviewUseCase = new getReviewUseCase_1.GetReviewUseCase(feedbackRepo);
exports.userController = new userController_1.UserController(
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
const bankRepo = new bankDetailsRepository_1.BankDetailsRepository();
const createRazorpayOrderUseCase =
  new createRazorpayOrderUseCase_1.CreateRazorpayOrderUseCase(bankRepo);
const verifyPaymentUseCase = new verifyPaymentUseCase_1.VerifyPaymentUseCase(
  appointmentRepo,
);
exports.paymentController = new paymentController_1.PaymentController(
  createRazorpayOrderUseCase,
  verifyPaymentUseCase,
);
