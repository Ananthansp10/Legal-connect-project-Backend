import { AdminAuthController } from "../module/auth/adminAuth/interface/controller/adminAuthController";
import { TokenGenerationService } from "../module/auth/userAuth/infrastructure/services/tokenGenerationService";
import { AdminSigninUseCase } from "../module/auth/adminAuth/application/use-cases/adminSigninUseCase";
import { CookieTokenService } from "../module/auth/userAuth/infrastructure/services/cookieTokenService";
import { AdminLawyerManagementController } from "../module/admin/interface/controller/adminLawyerManagementController";
import { LawyerVerificationRepository } from "../module/admin/infrastructure/repository/lawyerVerificationRepository";
import { LawyerVerificationUseCase } from "../module/admin/application/use-case/lawyerVerificationUseCase";
import { BaseRepository } from "../module/admin/infrastructure/repository/baseRepository";
import { lawyerModel } from "../module/auth/lawyerAuth/infrastructure/models/lawyerModel";
import { GetUnverifiedLawyersUseCase } from "../module/admin/application/use-case/getUnverifiedLawyerUseCase";
import { LawyerVerificationEmail } from "../module/admin/infrastructure/services/lawyerVerificarionEmailService";
import { LawyerRepository } from "../module/admin/infrastructure/repository/lawyerRepository";
import { GetLawyersUseCase } from "../module/admin/application/use-case/getLawyersUseCase";
import { AdminUserManagementController } from "../module/admin/interface/controller/adminUserManagementController";
import { UserRepository } from "../module/admin/infrastructure/repository/userRepository";
import { GetUsersUseCase } from "../module/admin/application/use-case/getUsersUseCase";
import { VerifyLawyerStatusUseCase } from "../module/admin/application/use-case/verifyLawyerStatusUseCase";
import { VerifyUserStatusUseCase } from "../module/admin/application/use-case/verifyUserStatusUseCase";
import { AdminSpecializationController } from "../module/admin/interface/controller/adminSpecializationController";
import { AddSpecializationRepository } from "../module/admin/infrastructure/repository/addSpecializationRepository";
import { AddSpecializationUseCase } from "../module/admin/application/use-case/addSpecializationUseCase";
import { GetSpecializationRepository } from "../module/admin/infrastructure/repository/getSpecializationRepository";
import { GetSpecializationUseCase } from "../module/admin/application/use-case/getSpecialisationUseCase";
import { EditSpecializationRepository } from "../module/admin/infrastructure/repository/editSpecializationRepository";
import { EditSpecializationUseCase } from "../module/admin/application/use-case/editSpecializationUseCase";
import { DeleteSpecializationRepository } from "../module/admin/infrastructure/repository/deleteSpecializationRepository";
import { DeleteSpecializationUseCase } from "../module/admin/application/use-case/deleteSpecializationUseCase";
import { AdminController } from "../module/admin/interface/controller/adminController";
import { AppointmentRepository } from "../module/admin/infrastructure/repository/appointmentRepository";
import { GetAppointmentsUseCase } from "../module/admin/application/use-case/getAppointmentsUseCase";
import { ReportAccountRepository } from "../module/admin/infrastructure/repository/reportAccountRepository";
import { GetReportedAccountsUseCase } from "../module/admin/application/use-case/getReportedAccounts";
import { UpdateReportedAccountUseCase } from "../module/admin/application/use-case/updateReportedAccountUseCase";
import { PlanManagementRepository } from "../module/admin/infrastructure/repository/planManagementRepository";
import { AddPlanUseCase } from "../module/admin/application/use-case/addPlanUseCase";
import { EditPlanUseCase } from "../module/admin/application/use-case/editPlanUseCase";
import { ManagePlanStatusUseCase } from "../module/admin/application/use-case/managePlanStatusUseCase";
import { DeletePlanUseCase } from "../module/admin/application/use-case/deletePlanUseCase";
import { GetPlansUseCase } from "../module/admin/application/use-case/getPlansUseCase";
import { SearchUserUseCase } from "../module/admin/application/use-case/searchUserUseCase";
import { SearchLawyerUseCase } from "../module/admin/application/use-case/searchLawyerUseCase";
import { FilterLawyerUseCase } from "../module/admin/application/use-case/filterLawyerUseCase";
import { FilterUserUseCase } from "../module/admin/application/use-case/filterUserUseCase";
import { GetLawyerProfileDataUseCase } from "../module/admin/application/use-case/getLawyerProfileDataUseCase";
import { GetUserProfileDataUseCase } from "../module/admin/application/use-case/getUserProfileDataUseCase";
import { SummaryReportRepository } from "../module/admin/infrastructure/repository/summaryReportRepository";
import { GetSummaryReportUseCase } from "../module/admin/application/use-case/getSummaryReportUseCase";
import { ReportsRepository } from "../module/admin/infrastructure/repository/reportsRepository";
import { GetReportsUseCase } from "../module/admin/application/use-case/getReportsUseCase";
import { SearchAppointmentUseCase } from "../module/admin/application/use-case/searchAppointmentUseCase";
import { GetPlanSummaryReportUseCase } from "../module/admin/application/use-case/getPlanSummaryReportUseCase";
import { SearchPlanUseCase } from "../module/admin/application/use-case/searchPlanUseCase";

const tokenGenerateService = new TokenGenerationService();
const adminSigninApplication = new AdminSigninUseCase(tokenGenerateService);
const tokenCookieService = new CookieTokenService();
const lawyerVerificationRepo = new LawyerVerificationRepository();
const lawyerVerifyEmailService = new LawyerVerificationEmail();
const verifyLawyerApplication = new LawyerVerificationUseCase(
  lawyerVerificationRepo,
  lawyerVerifyEmailService,
);
const adminLawyerRepo = new BaseRepository(lawyerModel);
const getUnverifiedLawyerApplication = new GetUnverifiedLawyersUseCase(
  adminLawyerRepo,
);
const lawyerMongoRepo = new LawyerRepository();
const getLawyersApplication = new GetLawyersUseCase(lawyerMongoRepo);

export const adminAuthController = new AdminAuthController(
  adminSigninApplication,
  tokenCookieService,
);

const verifyLawyerStatusApplication = new VerifyLawyerStatusUseCase(
  lawyerMongoRepo,
);
const searchLawyerUseCase = new SearchLawyerUseCase(lawyerMongoRepo);
const filterLawyerUseCase = new FilterLawyerUseCase(lawyerMongoRepo);
const getLawyerProfileUseCase = new GetLawyerProfileDataUseCase(
  lawyerMongoRepo,
);

export const adminLawyerManagementController =
  new AdminLawyerManagementController(
    verifyLawyerApplication,
    getUnverifiedLawyerApplication,
    getLawyersApplication,
    verifyLawyerStatusApplication,
    searchLawyerUseCase,
    filterLawyerUseCase,
    getLawyerProfileUseCase,
  );

const userMongoRepo = new UserRepository();
const getUserApplication = new GetUsersUseCase(userMongoRepo);
const verifyUserStatusApplication = new VerifyUserStatusUseCase(userMongoRepo);
const searchUserUseCase = new SearchUserUseCase(userMongoRepo);
const filterUserUseCase = new FilterUserUseCase(userMongoRepo);
const getUserProfileUseCase = new GetUserProfileDataUseCase(userMongoRepo);

export const adminUserManagementController = new AdminUserManagementController(
  getUserApplication,
  verifyUserStatusApplication,
  searchUserUseCase,
  filterUserUseCase,
  getUserProfileUseCase,
);

const addSpecializationMongoRepo = new AddSpecializationRepository();
const addSpecializationApplication = new AddSpecializationUseCase(
  addSpecializationMongoRepo,
);
const getSpecializationMongoRepo = new GetSpecializationRepository();
const getSpecializationApplication = new GetSpecializationUseCase(
  getSpecializationMongoRepo,
);
const editSpecializationRepo = new EditSpecializationRepository();
const editSpecializationApplication = new EditSpecializationUseCase(
  editSpecializationRepo,
);
const deleteSpecializationRepo = new DeleteSpecializationRepository();
const deleteSpecializationApplication = new DeleteSpecializationUseCase(
  deleteSpecializationRepo,
);

export const adminSpecializationController = new AdminSpecializationController(
  addSpecializationApplication,
  getSpecializationApplication,
  editSpecializationApplication,
  deleteSpecializationApplication,
);

const appointmentRepo = new AppointmentRepository();
const getAppointmentUseCase = new GetAppointmentsUseCase(appointmentRepo);
const reportedAccountRepo = new ReportAccountRepository();
const getReportedAccountUseCase = new GetReportedAccountsUseCase(
  reportedAccountRepo,
);
const updateReportedAccountUseCase = new UpdateReportedAccountUseCase(
  reportedAccountRepo,
);
const planeManagementRepo = new PlanManagementRepository();
const addPlanUseCase = new AddPlanUseCase(planeManagementRepo);
const editPlanUseCase = new EditPlanUseCase(planeManagementRepo);
const managePlanStatusUseCase = new ManagePlanStatusUseCase(
  planeManagementRepo,
);
const deletePlanUseCase = new DeletePlanUseCase(planeManagementRepo);
const getPlansUseCase = new GetPlansUseCase(planeManagementRepo);
const summaryReportRepo = new SummaryReportRepository();
const getSummaryReportUseCase = new GetSummaryReportUseCase(summaryReportRepo);
const reportsRepo = new ReportsRepository();
const getReportsUseCase = new GetReportsUseCase(reportsRepo);
const searchAppointmentUseCase = new SearchAppointmentUseCase(appointmentRepo);
const getPlanSummaryReportUseCase = new GetPlanSummaryReportUseCase(
  planeManagementRepo,
);
const searchPlanUseCase = new SearchPlanUseCase(planeManagementRepo);

export const adminController = new AdminController(
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
