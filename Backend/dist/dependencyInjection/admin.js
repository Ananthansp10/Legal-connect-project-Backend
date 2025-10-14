"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController =
  exports.adminSpecializationController =
  exports.adminUserManagementController =
  exports.adminLawyerManagementController =
  exports.adminAuthController =
    void 0;
const adminAuthController_1 = require("../module/auth/adminAuth/interface/controller/adminAuthController");
const tokenGenerationService_1 = require("../module/auth/userAuth/infrastructure/services/tokenGenerationService");
const adminSigninUseCase_1 = require("../module/auth/adminAuth/application/use-cases/adminSigninUseCase");
const cookieTokenService_1 = require("../module/auth/userAuth/infrastructure/services/cookieTokenService");
const adminLawyerManagementController_1 = require("../module/admin/interface/controller/adminLawyerManagementController");
const lawyerVerificationRepository_1 = require("../module/admin/infrastructure/repository/lawyerVerificationRepository");
const lawyerVerificationUseCase_1 = require("../module/admin/application/use-case/lawyerVerificationUseCase");
const baseRepository_1 = require("../module/admin/infrastructure/repository/baseRepository");
const lawyerModel_1 = require("../module/auth/lawyerAuth/infrastructure/models/lawyerModel");
const getUnverifiedLawyerUseCase_1 = require("../module/admin/application/use-case/getUnverifiedLawyerUseCase");
const lawyerVerificarionEmailService_1 = require("../module/admin/infrastructure/services/lawyerVerificarionEmailService");
const lawyerRepository_1 = require("../module/admin/infrastructure/repository/lawyerRepository");
const getLawyersUseCase_1 = require("../module/admin/application/use-case/getLawyersUseCase");
const adminUserManagementController_1 = require("../module/admin/interface/controller/adminUserManagementController");
const userRepository_1 = require("../module/admin/infrastructure/repository/userRepository");
const getUsersUseCase_1 = require("../module/admin/application/use-case/getUsersUseCase");
const verifyLawyerStatusUseCase_1 = require("../module/admin/application/use-case/verifyLawyerStatusUseCase");
const verifyUserStatusUseCase_1 = require("../module/admin/application/use-case/verifyUserStatusUseCase");
const adminSpecializationController_1 = require("../module/admin/interface/controller/adminSpecializationController");
const addSpecializationRepository_1 = require("../module/admin/infrastructure/repository/addSpecializationRepository");
const addSpecializationUseCase_1 = require("../module/admin/application/use-case/addSpecializationUseCase");
const getSpecializationRepository_1 = require("../module/admin/infrastructure/repository/getSpecializationRepository");
const getSpecialisationUseCase_1 = require("../module/admin/application/use-case/getSpecialisationUseCase");
const editSpecializationRepository_1 = require("../module/admin/infrastructure/repository/editSpecializationRepository");
const editSpecializationUseCase_1 = require("../module/admin/application/use-case/editSpecializationUseCase");
const deleteSpecializationRepository_1 = require("../module/admin/infrastructure/repository/deleteSpecializationRepository");
const deleteSpecializationUseCase_1 = require("../module/admin/application/use-case/deleteSpecializationUseCase");
const adminController_1 = require("../module/admin/interface/controller/adminController");
const appointmentRepository_1 = require("../module/admin/infrastructure/repository/appointmentRepository");
const getAppointmentsUseCase_1 = require("../module/admin/application/use-case/getAppointmentsUseCase");
const reportAccountRepository_1 = require("../module/admin/infrastructure/repository/reportAccountRepository");
const getReportedAccounts_1 = require("../module/admin/application/use-case/getReportedAccounts");
const updateReportedAccountUseCase_1 = require("../module/admin/application/use-case/updateReportedAccountUseCase");
const planManagementRepository_1 = require("../module/admin/infrastructure/repository/planManagementRepository");
const addPlanUseCase_1 = require("../module/admin/application/use-case/addPlanUseCase");
const editPlanUseCase_1 = require("../module/admin/application/use-case/editPlanUseCase");
const managePlanStatusUseCase_1 = require("../module/admin/application/use-case/managePlanStatusUseCase");
const deletePlanUseCase_1 = require("../module/admin/application/use-case/deletePlanUseCase");
const getPlansUseCase_1 = require("../module/admin/application/use-case/getPlansUseCase");
const searchUserUseCase_1 = require("../module/admin/application/use-case/searchUserUseCase");
const searchLawyerUseCase_1 = require("../module/admin/application/use-case/searchLawyerUseCase");
const filterLawyerUseCase_1 = require("../module/admin/application/use-case/filterLawyerUseCase");
const filterUserUseCase_1 = require("../module/admin/application/use-case/filterUserUseCase");
const getLawyerProfileDataUseCase_1 = require("../module/admin/application/use-case/getLawyerProfileDataUseCase");
const getUserProfileDataUseCase_1 = require("../module/admin/application/use-case/getUserProfileDataUseCase");
const summaryReportRepository_1 = require("../module/admin/infrastructure/repository/summaryReportRepository");
const getSummaryReportUseCase_1 = require("../module/admin/application/use-case/getSummaryReportUseCase");
const reportsRepository_1 = require("../module/admin/infrastructure/repository/reportsRepository");
const getReportsUseCase_1 = require("../module/admin/application/use-case/getReportsUseCase");
const searchAppointmentUseCase_1 = require("../module/admin/application/use-case/searchAppointmentUseCase");
const getPlanSummaryReportUseCase_1 = require("../module/admin/application/use-case/getPlanSummaryReportUseCase");
const searchPlanUseCase_1 = require("../module/admin/application/use-case/searchPlanUseCase");
const tokenGenerateService =
  new tokenGenerationService_1.TokenGenerationService();
const adminSigninApplication = new adminSigninUseCase_1.AdminSigninUseCase(
  tokenGenerateService,
);
const tokenCookieService = new cookieTokenService_1.CookieTokenService();
const lawyerVerificationRepo =
  new lawyerVerificationRepository_1.LawyerVerificationRepository();
const lawyerVerifyEmailService =
  new lawyerVerificarionEmailService_1.LawyerVerificationEmail();
const verifyLawyerApplication =
  new lawyerVerificationUseCase_1.LawyerVerificationUseCase(
    lawyerVerificationRepo,
    lawyerVerifyEmailService,
  );
const adminLawyerRepo = new baseRepository_1.BaseRepository(
  lawyerModel_1.lawyerModel,
);
const getUnverifiedLawyerApplication =
  new getUnverifiedLawyerUseCase_1.GetUnverifiedLawyersUseCase(adminLawyerRepo);
const lawyerMongoRepo = new lawyerRepository_1.LawyerRepository();
const getLawyersApplication = new getLawyersUseCase_1.GetLawyersUseCase(
  lawyerMongoRepo,
);
exports.adminAuthController = new adminAuthController_1.AdminAuthController(
  adminSigninApplication,
  tokenCookieService,
);
const verifyLawyerStatusApplication =
  new verifyLawyerStatusUseCase_1.VerifyLawyerStatusUseCase(lawyerMongoRepo);
const searchLawyerUseCase = new searchLawyerUseCase_1.SearchLawyerUseCase(
  lawyerMongoRepo,
);
const filterLawyerUseCase = new filterLawyerUseCase_1.FilterLawyerUseCase(
  lawyerMongoRepo,
);
const getLawyerProfileUseCase =
  new getLawyerProfileDataUseCase_1.GetLawyerProfileDataUseCase(
    lawyerMongoRepo,
  );
exports.adminLawyerManagementController =
  new adminLawyerManagementController_1.AdminLawyerManagementController(
    verifyLawyerApplication,
    getUnverifiedLawyerApplication,
    getLawyersApplication,
    verifyLawyerStatusApplication,
    searchLawyerUseCase,
    filterLawyerUseCase,
    getLawyerProfileUseCase,
  );
const userMongoRepo = new userRepository_1.UserRepository();
const getUserApplication = new getUsersUseCase_1.GetUsersUseCase(userMongoRepo);
const verifyUserStatusApplication =
  new verifyUserStatusUseCase_1.VerifyUserStatusUseCase(userMongoRepo);
const searchUserUseCase = new searchUserUseCase_1.SearchUserUseCase(
  userMongoRepo,
);
const filterUserUseCase = new filterUserUseCase_1.FilterUserUseCase(
  userMongoRepo,
);
const getUserProfileUseCase =
  new getUserProfileDataUseCase_1.GetUserProfileDataUseCase(userMongoRepo);
exports.adminUserManagementController =
  new adminUserManagementController_1.AdminUserManagementController(
    getUserApplication,
    verifyUserStatusApplication,
    searchUserUseCase,
    filterUserUseCase,
    getUserProfileUseCase,
  );
const addSpecializationMongoRepo =
  new addSpecializationRepository_1.AddSpecializationRepository();
const addSpecializationApplication =
  new addSpecializationUseCase_1.AddSpecializationUseCase(
    addSpecializationMongoRepo,
  );
const getSpecializationMongoRepo =
  new getSpecializationRepository_1.GetSpecializationRepository();
const getSpecializationApplication =
  new getSpecialisationUseCase_1.GetSpecializationUseCase(
    getSpecializationMongoRepo,
  );
const editSpecializationRepo =
  new editSpecializationRepository_1.EditSpecializationRepository();
const editSpecializationApplication =
  new editSpecializationUseCase_1.EditSpecializationUseCase(
    editSpecializationRepo,
  );
const deleteSpecializationRepo =
  new deleteSpecializationRepository_1.DeleteSpecializationRepository();
const deleteSpecializationApplication =
  new deleteSpecializationUseCase_1.DeleteSpecializationUseCase(
    deleteSpecializationRepo,
  );
exports.adminSpecializationController =
  new adminSpecializationController_1.AdminSpecializationController(
    addSpecializationApplication,
    getSpecializationApplication,
    editSpecializationApplication,
    deleteSpecializationApplication,
  );
const appointmentRepo = new appointmentRepository_1.AppointmentRepository();
const getAppointmentUseCase =
  new getAppointmentsUseCase_1.GetAppointmentsUseCase(appointmentRepo);
const reportedAccountRepo =
  new reportAccountRepository_1.ReportAccountRepository();
const getReportedAccountUseCase =
  new getReportedAccounts_1.GetReportedAccountsUseCase(reportedAccountRepo);
const updateReportedAccountUseCase =
  new updateReportedAccountUseCase_1.UpdateReportedAccountUseCase(
    reportedAccountRepo,
  );
const planeManagementRepo =
  new planManagementRepository_1.PlanManagementRepository();
const addPlanUseCase = new addPlanUseCase_1.AddPlanUseCase(planeManagementRepo);
const editPlanUseCase = new editPlanUseCase_1.EditPlanUseCase(
  planeManagementRepo,
);
const managePlanStatusUseCase =
  new managePlanStatusUseCase_1.ManagePlanStatusUseCase(planeManagementRepo);
const deletePlanUseCase = new deletePlanUseCase_1.DeletePlanUseCase(
  planeManagementRepo,
);
const getPlansUseCase = new getPlansUseCase_1.GetPlansUseCase(
  planeManagementRepo,
);
const summaryReportRepo =
  new summaryReportRepository_1.SummaryReportRepository();
const getSummaryReportUseCase =
  new getSummaryReportUseCase_1.GetSummaryReportUseCase(summaryReportRepo);
const reportsRepo = new reportsRepository_1.ReportsRepository();
const getReportsUseCase = new getReportsUseCase_1.GetReportsUseCase(
  reportsRepo,
);
const searchAppointmentUseCase =
  new searchAppointmentUseCase_1.SearchAppointmentUseCase(appointmentRepo);
const getPlanSummaryReportUseCase =
  new getPlanSummaryReportUseCase_1.GetPlanSummaryReportUseCase(
    planeManagementRepo,
  );
const searchPlanUseCase = new searchPlanUseCase_1.SearchPlanUseCase(
  planeManagementRepo,
);
exports.adminController = new adminController_1.AdminController(
  getAppointmentUseCase,
  getReportedAccountUseCase,
  updateReportedAccountUseCase,
  addPlanUseCase,
  editPlanUseCase,
  managePlanStatusUseCase,
  deletePlanUseCase,
  getPlansUseCase,
  getSummaryReportUseCase,
  getReportsUseCase,
  searchAppointmentUseCase,
  getPlanSummaryReportUseCase,
  searchPlanUseCase,
);
