import express from "express";
const router = express.Router();
import { verifyToken } from "../middlewares/verifyTokenMiddleware";
import { verifyRole } from "../middlewares/verifyRoleMiddleware";
import { adminAuthController } from "../dependencyInjection/admin";
import { adminLawyerManagementController } from "../dependencyInjection/admin";
import { adminUserManagementController } from "../dependencyInjection/admin";
import { adminSpecializationController } from "../dependencyInjection/admin";
import { adminController } from "../dependencyInjection/admin";

router.post("/signin", (req, res) => adminAuthController.signin(req, res));

router.post("/logout", (req, res) => adminAuthController.logout(req, res));

router.get(
  "/unverifiedLawyers",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminLawyerManagementController.getUnverifiedLawyers(req, res),
);

router.patch(
  "/verification/:lawyerId/:status/:reason",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminLawyerManagementController.verifyLawyer(req, res),
);

router.get("/getlawyers", verifyToken, verifyRole(["admin"]), (req, res) =>
  adminLawyerManagementController.getLawyers(req, res),
);

router.get(
  "/getusers/:startIndex/:limit",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminUserManagementController.getUsers(req, res),
);

router.patch(
  "/lawyer/:lawyerId/:status",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminLawyerManagementController.verifyLawyerStatus(req, res),
);

router.patch(
  "/user/:userId/:status",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminUserManagementController.verifyUserStatus(req, res),
);

router.post(
  "/add-specialization",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminSpecializationController.addSpecialization(req, res),
);

router.get(
  "/get-specialization/:startIndex/:limit",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminSpecializationController.getSpecialization(req, res),
);

router.post(
  "/edit-specialization",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminSpecializationController.editSpecialization(req, res),
);

router.post(
  "/delete-specialization/:specId",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) =>
    adminSpecializationController.DeleteSpecializationApplication(req, res),
);

router.get(
  "/get-appointments/:appointmentStatus/:startIndex/:limit",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminController.getAppointments(req, res),
);

router.get(
  "/reported-accounts/:userType/:startIndex/:limit",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminController.getReportedAccounts(req, res),
);

router.post(
  "/update-reportedAccount-status/:reportedAccountId",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminController.updateReportedAccountStatus(req, res),
);

router.post("/add-plan", verifyToken, verifyRole(["admin"]), (req, res) =>
  adminController.addPlan(req, res),
);

router.put(
  "/edit-plan/:planId",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminController.editPlan(req, res),
);

router.post(
  "/manage-plan-status/:planId/:status",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminController.managePlanStatus(req, res),
);

router.post(
  "/delete-plan/:planId",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminController.DeletePlanUseCase(req, res),
);

router.get("/plans", verifyToken, verifyRole(["admin"]), (req, res) =>
  adminController.getPlans(req, res),
);

router.get(
  "/search-user/:name",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminUserManagementController.searchUser(req, res),
);

router.get(
  "/search-lawyer/:name",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminLawyerManagementController.searchLawyer(req, res),
);

router.get(
  "/filter-user/:status",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminUserManagementController.filterUser(req, res),
);

router.get(
  "/filter-lawyer/:status",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminLawyerManagementController.filterLawyer(req, res),
);

router.get(
  "/get-user-profile/:userId",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminUserManagementController.getUserProfile(req, res),
);

router.get(
  "/get-lawyer-profile/:lawyerId",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminLawyerManagementController.getLawyerProfile(req, res),
);

router.get(
  "/get-summary-report",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminController.getSummaryReport(req, res),
);

router.get(
  "/get-reports/:revenueDateRange/:specializationType",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminController.getReports(req, res),
);

router.get(
  "/search-appointment/:name",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminController.searchAppointments(req, res),
);

router.get(
  "/get-plan-summary-report",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminController.getPlanSummaryReport(req, res),
);

router.get(
  "/search-plan/:planName",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => adminController.searchPlan(req, res),
);

export default router;
