import  express  from "express";
import { verifyToken } from "../middlewares/verifyTokenMiddleware";
import { verifyRole } from "../middlewares/verifyRoleMiddleware";
const router=express.Router()
import { CheckAccountStatusMongoRepositorie } from "../module/auth/userAuth/infrastructure/mongoRepositories/checkAccountStatusMongoRepositorie";
import { verifyAccountStatus } from "../middlewares/verifyAccountStatus";

const checkUserAccountStatusMongoRepo=new CheckAccountStatusMongoRepositorie()

router.post('/verify-auth',verifyToken,verifyRole(['user']),verifyAccountStatus(checkUserAccountStatusMongoRepo),(req,res)=>{
    res.status(200).json({success:true,message:"Authorization successfull"})
})

router.post('/verify-lawyer-auth',verifyToken,verifyRole(['lawyer']),(req,res)=>{
    res.status(200).json({success:true,message:"Authorization successfull"})
})

router.post('/verify-admin-auth',verifyToken,verifyRole(['admin']),(req,res)=>{
    res.status(200).json({success:true,message:"Authorization successfull"})
})

export default router;