import express from 'express'
import { AdminAuthController } from '../module/auth/adminAuth/interface/controller/adminAuthController';
import { TokenGenerationService } from '../module/auth/userAuth/infrastructure/services/tokenGenerationService';
import { AdminSigninUseCase } from '../module/auth/adminAuth/application/use-cases/adminSigninUseCase';
import { CookieTokenService } from '../module/auth/userAuth/infrastructure/services/cookieTokenService';
import { AdminLawyerManagementController } from '../module/admin/interface/controller/adminLawyerManagementController';
import { LawyerVerificationRepository } from '../module/admin/infrastructure/repository/lawyerVerificationRepository';
import { LawyerVerificationUseCase } from '../module/admin/application/use-case/lawyerVerificationUseCase';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';
import { verifyRole } from '../middlewares/verifyRoleMiddleware';
import { BaseRepository } from '../module/admin/infrastructure/repository/baseRepository';
import { LawyerModel } from '../module/auth/lawyerAuth/infrastructure/models/lawyerModel';
import { GetUnverifiedLawyersUseCase } from '../module/admin/application/use-case/getUnverifiedLawyerUseCase';
import { LawyerVerificationEmail } from '../module/admin/infrastructure/services/lawyerVerificarionEmailService';
import { LawyerRepository } from '../module/admin/infrastructure/repository/lawyerRepository';
import { GetLawyersUseCase } from '../module/admin/application/use-case/getLawyersUseCase';
import { AdminUserManagementController } from '../module/admin/interface/controller/adminUserManagementController';
import { UserRepository } from '../module/admin/infrastructure/repository/userRepository';
import { GetUsersUseCase } from '../module/admin/application/use-case/getUsersUseCase';
import { VerifyLawyerStatusUseCase } from '../module/admin/application/use-case/verifyLawyerStatusUseCase';
import { VerifyUserStatusUseCase } from '../module/admin/application/use-case/verifyUserStatusUseCase';
import { AdminSpecializationController } from '../module/admin/interface/controller/adminSpecializationController';
import { AddSpecializationRepository } from '../module/admin/infrastructure/repository/addSpecializationRepository';
import { AddSpecializationUseCase } from '../module/admin/application/use-case/addSpecializationUseCase';
import { GetSpecializationRepository } from '../module/admin/infrastructure/repository/getSpecializationRepository';
import { GetSpecializationUseCase } from '../module/admin/application/use-case/getSpecialisationUseCase';
import { EditSpecializationRepository } from '../module/admin/infrastructure/repository/editSpecializationRepository';
import { EditSpecializationUseCase } from '../module/admin/application/use-case/editSpecializationUseCase';
import { DeleteSpecializationRepository } from '../module/admin/infrastructure/repository/deleteSpecializationRepository';
import { DeleteSpecializationUseCase } from '../module/admin/application/use-case/deleteSpecializationUseCase';
import { AdminController } from '../module/admin/interface/controller/adminController';
import { AppointmentRepository } from '../module/admin/infrastructure/repository/appointmentRepository';
import { GetAppointmentsUseCase } from '../module/admin/application/use-case/getAppointmentsUseCase';
import { ReportAccountRepository } from '../module/admin/infrastructure/repository/reportAccountRepository';
import { GetReportedAccountsUseCase } from '../module/admin/application/use-case/getReportedAccounts';
import { UpdateReportedAccountUseCase } from '../module/admin/application/use-case/updateReportedAccountUseCase';
import { PlanManagementRepository } from '../module/admin/infrastructure/repository/planManagementRepository';
import { AddPlanUseCase } from '../module/admin/application/use-case/addPlanUseCase';
import { EditPlanUseCase } from '../module/admin/application/use-case/editPlanUseCase';
import { ManagePlanStatusUseCase } from '../module/admin/application/use-case/managePlanStatusUseCase';
import { DeletePlanUseCase } from '../module/admin/application/use-case/deletePlanUseCase';
import { GetPlansUseCase } from '../module/admin/application/use-case/getPlansUseCase';
const router=express.Router()

const tokenGenerateService=new TokenGenerationService()
const adminSigninApplication=new AdminSigninUseCase(tokenGenerateService)
const tokenCookieService=new CookieTokenService()
const lawyerVerificationRepo=new LawyerVerificationRepository()
const lawyerVerifyEmailService=new LawyerVerificationEmail()
const verifyLawyerApplication=new LawyerVerificationUseCase(lawyerVerificationRepo,lawyerVerifyEmailService)
const adminLawyerRepo=new BaseRepository(LawyerModel)
const getUnverifiedLawyerApplication=new GetUnverifiedLawyersUseCase(adminLawyerRepo)
const lawyerMongoRepo=new LawyerRepository()
const getLawyersApplication=new GetLawyersUseCase(lawyerMongoRepo)

const adminAuthController=new AdminAuthController(adminSigninApplication,tokenCookieService)

const verifyLawyerStatusApplication=new VerifyLawyerStatusUseCase(lawyerMongoRepo)

const adminLawyerManagementController=new AdminLawyerManagementController(
    verifyLawyerApplication,
    getUnverifiedLawyerApplication,
    getLawyersApplication,
    verifyLawyerStatusApplication
)

const userMongoRepo=new UserRepository()
const getUserApplication=new GetUsersUseCase(userMongoRepo)
const verifyUserStatusApplication=new VerifyUserStatusUseCase(userMongoRepo)

const adminUserManagementController=new AdminUserManagementController(
    getUserApplication,
    verifyUserStatusApplication
)

const addSpecializationMongoRepo=new AddSpecializationRepository()
const addSpecializationApplication=new AddSpecializationUseCase(addSpecializationMongoRepo)
const getSpecializationMongoRepo=new GetSpecializationRepository()
const getSpecializationApplication=new GetSpecializationUseCase(getSpecializationMongoRepo)
const editSpecializationRepo=new EditSpecializationRepository()
const editSpecializationApplication=new EditSpecializationUseCase(editSpecializationRepo)
const deleteSpecializationRepo=new DeleteSpecializationRepository()
const deleteSpecializationApplication=new DeleteSpecializationUseCase(deleteSpecializationRepo)

const adminSpecializationController=new AdminSpecializationController(
    addSpecializationApplication,
    getSpecializationApplication,
    editSpecializationApplication,
    deleteSpecializationApplication
)

const appointmentRepo=new AppointmentRepository()
const getAppointmentUseCase=new GetAppointmentsUseCase(appointmentRepo)
const reportedAccountRepo=new ReportAccountRepository()
const getReportedAccountUseCase=new GetReportedAccountsUseCase(reportedAccountRepo)
const updateReportedAccountUseCase=new UpdateReportedAccountUseCase(reportedAccountRepo)
const planeManagementRepo=new PlanManagementRepository()
const addPlanUseCase=new AddPlanUseCase(planeManagementRepo)
const editPlanUseCase=new EditPlanUseCase(planeManagementRepo)
const managePlanStatusUseCase=new ManagePlanStatusUseCase(planeManagementRepo)
const deletePlanUseCase=new DeletePlanUseCase(planeManagementRepo)
const getPlansUseCase=new GetPlansUseCase(planeManagementRepo)


const adminController=new AdminController(
    getAppointmentUseCase,
    getReportedAccountUseCase,
    updateReportedAccountUseCase,
    addPlanUseCase,
    editPlanUseCase,
    managePlanStatusUseCase,
    deletePlanUseCase,
    getPlansUseCase
)


router.post('/signin',(req,res)=>adminAuthController.signin(req,res))

router.post('/logout',(req,res)=>adminAuthController.logout(req,res))

router.get('/unverifiedLawyers',verifyToken,verifyRole(['admin']),(req,res)=>adminLawyerManagementController.getUnverifiedLawyers(req,res))

router.patch('/verification/:lawyerId/:status/:reason',verifyToken,verifyRole(['admin']),(req,res)=>adminLawyerManagementController.verifyLawyer(req,res))

router.get('/getlawyers',verifyToken,verifyRole(['admin']),(req,res)=>adminLawyerManagementController.getLawyers(req,res))

router.get('/getusers',verifyToken,verifyRole(['admin']),(req,res)=>adminUserManagementController.getUsers(req,res))

router.patch('/lawyer/:lawyerId/:status',verifyToken,verifyRole(['admin']),(req,res)=>adminLawyerManagementController.verifyLawyerStatus(req,res))

router.patch('/user/:userId/:status',verifyToken,verifyRole(['admin']),(req,res)=>adminUserManagementController.verifyUserStatus(req,res))

router.post('/add-specialization',verifyToken,verifyRole(['admin']),(req,res)=>adminSpecializationController.addSpecialization(req,res))

router.get('/get-specialization',verifyToken,verifyRole(['admin']),(req,res)=>adminSpecializationController.getSpecialization(req,res))

router.post('/edit-specialization',verifyToken,verifyRole(['admin']),(req,res)=>adminSpecializationController.editSpecialization(req,res))

router.post('/delete-specialization/:specId',verifyToken,verifyRole(['admin']),(req,res)=>adminSpecializationController.DeleteSpecializationApplication(req,res))

router.get('/get-appointments/:appointmentStatus',verifyToken,verifyRole(['admin']),(req,res)=>adminController.getAppointments(req,res))

router.get('/reported-accounts/:userType',verifyToken,verifyRole(['admin']),(req,res)=>adminController.getReportedAccounts(req,res))

router.post('/update-reportedAccount-status/:reportedAccountId',verifyToken,verifyRole(['admin']),(req,res)=>adminController.updateReportedAccountStatus(req,res))

router.post('/add-plan',verifyToken,verifyRole(['admin']),(req,res)=>adminController.addPlan(req,res))

router.put('/edit-plan/:planId',verifyToken,verifyRole(['admin']),(req,res)=>adminController.editPlan(req,res))

router.post('/manage-plan-status/:planId/:status',verifyToken,verifyRole(['admin']),(req,res)=>adminController.managePlanStatus(req,res))

router.post('/delete-plan/:planId',verifyToken,verifyRole(['admin']),(req,res)=>adminController.DeletePlanUseCase(req,res))

router.get('/plans',verifyToken,verifyRole(['admin']),(req,res)=>adminController.getPlans(req,res))

export default router;