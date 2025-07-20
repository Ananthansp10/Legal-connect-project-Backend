import  express  from "express";
import { verifyToken } from "../middlewares/verifyTokenMiddleware";
import { verifyRole } from "../middlewares/verifyRoleMiddleware";
const router=express.Router()

router.post('/verify-auth',verifyToken,verifyRole(['user']),(req,res)=>{
    res.status(200).json({success:true,message:"Authorization successfull"})
})

export default router;