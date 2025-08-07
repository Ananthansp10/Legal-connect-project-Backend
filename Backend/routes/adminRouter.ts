import express from 'express'
import { AdminAuthController } from '../module/auth/adminAuth/interface/controller/adminAuthController';
import { TokenGenerationService } from '../module/auth/userAuth/infrastructure/services/tokenGenerationService';
import { AdminSigninApplication } from '../module/auth/adminAuth/application/use-cases/adminSigninApplication';
import { CookieTokenService } from '../module/auth/userAuth/infrastructure/services/cookieTokenService';
import { AdminLawyerManagementController } from '../module/admin/interface/controller/adminLawyerManagementController';
import { LawyerVerificationMongoRepositorie } from '../module/admin/infrastructure/mongoRepositorie/lawyerVerificationMongoRepositorie';
import { LawyerVerificationApplication } from '../module/admin/application/use-case/lawyerVerificationApplication';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';
import { verifyRole } from '../middlewares/verifyRoleMiddleware';
import { BaseMongoRepositorie } from '../module/admin/infrastructure/mongoRepositorie/baseRepositories';
import { LawyerModel } from '../module/auth/lawyerAuth/infrastructure/models/lawyerModel';
import { GetUnverifiedLawyers } from '../module/admin/application/use-case/getUnverifiedLawyerApplication';
import { LawyerVerificationEmail } from '../module/admin/infrastructure/services/lawyerVerificarionEmailService';
import { LawyerMongoRepositorie } from '../module/admin/infrastructure/mongoRepositorie/lawyerMongoRepositorie';
import { GetLawyersApplication } from '../module/admin/application/use-case/getLawyersApplication';
import { AdminUserManagementController } from '../module/admin/interface/controller/adminUserManagementController';
import { UserMongoRepositorie } from '../module/admin/infrastructure/mongoRepositorie/userMongoRepositorie';
import { GetUsersApplication } from '../module/admin/application/use-case/getUsersApplication';
import { VerifyLawyerStatusApplication } from '../module/admin/application/use-case/verifyLawyerStatusApplication';
import { VerifyUserStatusApplication } from '../module/admin/application/use-case/verifyUserStatusApllication';
import { AdminSpecializationController } from '../module/admin/interface/controller/adminSpecializationController';
import { AddSpecializationMongoRepositorie } from '../module/admin/infrastructure/mongoRepositorie/addSpecializationMongoRepositorie';
import { AddSpecializationApplication } from '../module/admin/application/use-case/addSpecializationApplication';
import { GetSpecializationMongoRepositorie } from '../module/admin/infrastructure/mongoRepositorie/getSpecializationMongoRepositorie';
import { GetSpecializationApplication } from '../module/admin/application/use-case/getSpecialisationApplication';
const router=express.Router()

const tokenGenerateService=new TokenGenerationService()
const adminSigninApplication=new AdminSigninApplication(tokenGenerateService)
const tokenCookieService=new CookieTokenService()
const lawyerVerificationRepo=new LawyerVerificationMongoRepositorie()
const lawyerVerifyEmailService=new LawyerVerificationEmail()
const verifyLawyerApplication=new LawyerVerificationApplication(lawyerVerificationRepo,lawyerVerifyEmailService)
const adminLawyerRepo=new BaseMongoRepositorie(LawyerModel)
const getUnverifiedLawyerApplication=new GetUnverifiedLawyers(adminLawyerRepo)
const lawyerMongoRepo=new LawyerMongoRepositorie()
const getLawyersApplication=new GetLawyersApplication(lawyerMongoRepo)

const adminAuthController=new AdminAuthController(adminSigninApplication,tokenCookieService)

const verifyLawyerStatusApplication=new VerifyLawyerStatusApplication(lawyerMongoRepo)

const adminLawyerManagementController=new AdminLawyerManagementController(
    verifyLawyerApplication,
    getUnverifiedLawyerApplication,
    getLawyersApplication,
    verifyLawyerStatusApplication
)

const userMongoRepo=new UserMongoRepositorie()
const getUserApplication=new GetUsersApplication(userMongoRepo)
const verifyUserStatusApplication=new VerifyUserStatusApplication(userMongoRepo)

const adminUserManagementController=new AdminUserManagementController(
    getUserApplication,
    verifyUserStatusApplication
)

const addSpecializationMongoRepo=new AddSpecializationMongoRepositorie()
const addSpecializationApplication=new AddSpecializationApplication(addSpecializationMongoRepo)
const getSpecializationMongoRepo=new GetSpecializationMongoRepositorie()
const getSpecializationApplication=new GetSpecializationApplication(getSpecializationMongoRepo)

const adminSpecializationController=new AdminSpecializationController(addSpecializationApplication,getSpecializationApplication)


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

export default router;