import express from 'express'
import { AdminAuthController } from '../module/auth/adminAuth/interface/controller/adminAuthController';
import { TokenGenerationService } from '../module/auth/userAuth/infrastructure/services/tokenGenerationService';
import { AdminSigninApplication } from '../module/auth/adminAuth/application/use-cases/adminSigninApplication';
import { CookieTokenService } from '../module/auth/userAuth/infrastructure/services/cookieTokenService';
import { AdminLawyerManagementController } from '../module/admin/interface/controller/adminLawyerManagementController';
import { LawyerVerificationRepository } from '../module/admin/infrastructure/mongoRepositorie/lawyerVerificationRepository';
import { LawyerVerificationApplication } from '../module/admin/application/use-case/lawyerVerificationApplication';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';
import { verifyRole } from '../middlewares/verifyRoleMiddleware';
import { BaseRepository } from '../module/admin/infrastructure/mongoRepositorie/baseRepository';
import { LawyerModel } from '../module/auth/lawyerAuth/infrastructure/models/lawyerModel';
import { GetUnverifiedLawyers } from '../module/admin/application/use-case/getUnverifiedLawyerApplication';
import { LawyerVerificationEmail } from '../module/admin/infrastructure/services/lawyerVerificarionEmailService';
import { LawyerRepository } from '../module/admin/infrastructure/mongoRepositorie/lawyerRepository';
import { GetLawyersApplication } from '../module/admin/application/use-case/getLawyersApplication';
import { AdminUserManagementController } from '../module/admin/interface/controller/adminUserManagementController';
import { UserRepositorie } from '../module/admin/infrastructure/mongoRepositorie/userRepository';
import { GetUsersApplication } from '../module/admin/application/use-case/getUsersApplication';
import { VerifyLawyerStatusApplication } from '../module/admin/application/use-case/verifyLawyerStatusApplication';
import { VerifyUserStatusApplication } from '../module/admin/application/use-case/verifyUserStatusApllication';
import { AdminSpecializationController } from '../module/admin/interface/controller/adminSpecializationController';
import { AddSpecializationRepository } from '../module/admin/infrastructure/mongoRepositorie/addSpecializationRepository';
import { AddSpecializationApplication } from '../module/admin/application/use-case/addSpecializationApplication';
import { GetSpecializationRepository } from '../module/admin/infrastructure/mongoRepositorie/getSpecializationRepository';
import { GetSpecializationApplication } from '../module/admin/application/use-case/getSpecialisationApplication';
import { EditSpecializationRepository } from '../module/admin/infrastructure/mongoRepositorie/editSpecializationRepository';
import { EditSpecializationApplication } from '../module/admin/application/use-case/editSpecializationApplication';
import { DeleteSpecializationRepository } from '../module/admin/infrastructure/mongoRepositorie/deleteSpecializationRepository';
import { DeleteSpecializationApplication } from '../module/admin/application/use-case/deleteSpecializationApplication';
const router=express.Router()

const tokenGenerateService=new TokenGenerationService()
const adminSigninApplication=new AdminSigninApplication(tokenGenerateService)
const tokenCookieService=new CookieTokenService()
const lawyerVerificationRepo=new LawyerVerificationRepository()
const lawyerVerifyEmailService=new LawyerVerificationEmail()
const verifyLawyerApplication=new LawyerVerificationApplication(lawyerVerificationRepo,lawyerVerifyEmailService)
const adminLawyerRepo=new BaseRepository(LawyerModel)
const getUnverifiedLawyerApplication=new GetUnverifiedLawyers(adminLawyerRepo)
const lawyerMongoRepo=new LawyerRepository()
const getLawyersApplication=new GetLawyersApplication(lawyerMongoRepo)

const adminAuthController=new AdminAuthController(adminSigninApplication,tokenCookieService)

const verifyLawyerStatusApplication=new VerifyLawyerStatusApplication(lawyerMongoRepo)

const adminLawyerManagementController=new AdminLawyerManagementController(
    verifyLawyerApplication,
    getUnverifiedLawyerApplication,
    getLawyersApplication,
    verifyLawyerStatusApplication
)

const userMongoRepo=new UserRepositorie()
const getUserApplication=new GetUsersApplication(userMongoRepo)
const verifyUserStatusApplication=new VerifyUserStatusApplication(userMongoRepo)

const adminUserManagementController=new AdminUserManagementController(
    getUserApplication,
    verifyUserStatusApplication
)

const addSpecializationMongoRepo=new AddSpecializationRepository()
const addSpecializationApplication=new AddSpecializationApplication(addSpecializationMongoRepo)
const getSpecializationMongoRepo=new GetSpecializationRepository()
const getSpecializationApplication=new GetSpecializationApplication(getSpecializationMongoRepo)
const editSpecializationRepo=new EditSpecializationRepository()
const editSpecializationApplication=new EditSpecializationApplication(editSpecializationRepo)
const deleteSpecializationRepo=new DeleteSpecializationRepository()
const deleteSpecializationApplication=new DeleteSpecializationApplication(deleteSpecializationRepo)

const adminSpecializationController=new AdminSpecializationController(
    addSpecializationApplication,
    getSpecializationApplication,
    editSpecializationApplication,
    deleteSpecializationApplication
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

export default router;