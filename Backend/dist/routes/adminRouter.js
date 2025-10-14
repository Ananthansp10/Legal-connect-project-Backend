"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const verifyRoleMiddleware_1 = require("../middlewares/verifyRoleMiddleware");
const admin_1 = require("../dependencyInjection/admin");
const admin_2 = require("../dependencyInjection/admin");
const admin_3 = require("../dependencyInjection/admin");
const admin_4 = require("../dependencyInjection/admin");
const admin_5 = require("../dependencyInjection/admin");
router.post("/signin", (req, res) =>
  admin_1.adminAuthController.signin(req, res),
);
router.post("/logout", (req, res) =>
  admin_1.adminAuthController.logout(req, res),
);
router.get(
  "/unverifiedLawyers",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) =>
    admin_2.adminLawyerManagementController.getUnverifiedLawyers(req, res),
);
router.patch(
  "/verification/:lawyerId/:status/:reason",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_2.adminLawyerManagementController.verifyLawyer(req, res),
);
router.get(
  "/getlawyers",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_2.adminLawyerManagementController.getLawyers(req, res),
);
router.get(
  "/getusers/:startIndex/:limit",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_3.adminUserManagementController.getUsers(req, res),
);
router.patch(
  "/lawyer/:lawyerId/:status",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) =>
    admin_2.adminLawyerManagementController.verifyLawyerStatus(req, res),
);
router.patch(
  "/user/:userId/:status",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) =>
    admin_3.adminUserManagementController.verifyUserStatus(req, res),
);
router.post(
  "/add-specialization",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) =>
    admin_4.adminSpecializationController.addSpecialization(req, res),
);
router.get(
  "/get-specialization/:startIndex/:limit",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) =>
    admin_4.adminSpecializationController.getSpecialization(req, res),
);
router.post(
  "/edit-specialization",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) =>
    admin_4.adminSpecializationController.editSpecialization(req, res),
);
router.post(
  "/delete-specialization/:specId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) =>
    admin_4.adminSpecializationController.DeleteSpecializationApplication(
      req,
      res,
    ),
);
router.get(
  "/get-appointments/:appointmentStatus/:startIndex/:limit",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_5.adminController.getAppointments(req, res),
);
router.get(
  "/reported-accounts/:userType/:startIndex/:limit",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_5.adminController.getReportedAccounts(req, res),
);
router.post(
  "/update-reportedAccount-status/:reportedAccountId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_5.adminController.updateReportedAccountStatus(req, res),
);
router.post(
  "/add-plan",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_5.adminController.addPlan(req, res),
);
router.put(
  "/edit-plan/:planId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_5.adminController.editPlan(req, res),
);
router.post(
  "/manage-plan-status/:planId/:status",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_5.adminController.managePlanStatus(req, res),
);
router.post(
  "/delete-plan/:planId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_5.adminController.DeletePlanUseCase(req, res),
);
router.get(
  "/plans",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_5.adminController.getPlans(req, res),
);
router.get(
  "/search-user/:name",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_3.adminUserManagementController.searchUser(req, res),
);
router.get(
  "/search-lawyer/:name",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_2.adminLawyerManagementController.searchLawyer(req, res),
);
router.get(
  "/filter-user/:status",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_3.adminUserManagementController.filterUser(req, res),
);
router.get(
  "/filter-lawyer/:status",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_2.adminLawyerManagementController.filterLawyer(req, res),
);
router.get(
  "/get-user-profile/:userId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_3.adminUserManagementController.getUserProfile(req, res),
);
router.get(
  "/get-lawyer-profile/:lawyerId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) =>
    admin_2.adminLawyerManagementController.getLawyerProfile(req, res),
);
router.get(
  "/get-summary-report",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_5.adminController.getSummaryReport(req, res),
);
router.get(
  "/get-reports/:revenueDateRange/:specializationType",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_5.adminController.getReports(req, res),
);
router.get(
  "/search-appointment/:name",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_5.adminController.searchAppointments(req, res),
);
router.get(
  "/get-plan-summary-report",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_5.adminController.getPlanSummaryReport(req, res),
);
router.get(
  "/search-plan/:planName",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["admin"]),
  (req, res) => admin_5.adminController.searchPlan(req, res),
);
exports.default = router;
