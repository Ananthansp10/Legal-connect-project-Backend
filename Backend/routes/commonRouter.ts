import express from "express";
import { verifyToken } from "../middlewares/verifyTokenMiddleware";
import { verifyRole } from "../middlewares/verifyRoleMiddleware";
const router = express.Router();
import { CheckAccountStatusRepository } from "../module/auth/userAuth/infrastructure/repository/checkAccountStatusRepository";
import { verifyAccountStatus } from "../middlewares/verifyAccountStatus";
import { AppStatusCode } from "../common/statusCode/AppStatusCode";

const checkUserAccountStatusMongoRepo = new CheckAccountStatusRepository();

router.post(
    "/verify-auth",
    verifyToken,
    verifyRole(["user"]),
    verifyAccountStatus(checkUserAccountStatusMongoRepo),
    (req, res) => {
        res
            .status(AppStatusCode.SUCCESS_CODE)
            .json({ success: true, message: "Authorization successfull" });
    },
);

router.post(
    "/verify-lawyer-auth",
    verifyToken,
    verifyRole(["lawyer"]),
    (req, res) => {
        res
            .status(AppStatusCode.SUCCESS_CODE)
            .json({ success: true, message: "Authorization successfull" });
    },
);

router.post(
    "/verify-admin-auth",
    verifyToken,
    verifyRole(["admin"]),
    (req, res) => {
        res
            .status(AppStatusCode.SUCCESS_CODE)
            .json({ success: true, message: "Authorization successfull" });
    },
);

export default router;
