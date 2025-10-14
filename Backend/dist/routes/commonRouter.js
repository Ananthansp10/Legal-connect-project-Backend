"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const verifyRoleMiddleware_1 = require("../middlewares/verifyRoleMiddleware");
const router = express_1.default.Router();
const checkAccountStatusRepository_1 = require("../module/auth/userAuth/infrastructure/repository/checkAccountStatusRepository");
const verifyAccountStatus_1 = require("../middlewares/verifyAccountStatus");
const AppStatusCode_1 = require("../common/statusCode/AppStatusCode");
const checkUserAccountStatusMongoRepo =
  new checkAccountStatusRepository_1.CheckAccountStatusRepository();
router.post(
  "/verify-auth",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    checkUserAccountStatusMongoRepo,
  ),
  (req, res) => {
    res
      .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
      .json({ success: true, message: "Authorization successfull" });
  },
);
router.post(
  "/verify-lawyer-auth",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => {
    res
      .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
      .json({ success: true, message: "Authorization successfull" });
  },
);
router.post(
  "/verify-admin-auth",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => {
    res
      .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
      .json({ success: true, message: "Authorization successfull" });
  },
);
exports.default = router;
