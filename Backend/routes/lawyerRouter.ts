import express from "express";
const router = express.Router();
import { IMulterRequest } from "../module/auth/lawyerAuth/interface/controller/lawyerAuthController";
import upload from "../config/multerConfig";
import { verifyToken } from "../middlewares/verifyTokenMiddleware";
import { verifyRole } from "../middlewares/verifyRoleMiddleware";
import { lawyerAuthController } from "../dependencyInjection/lawyer";
import { lawyerController } from "../dependencyInjection/lawyer";
import { lawyerProfileController } from "../dependencyInjection/lawyer";
import { authCookieService } from "../dependencyInjection/lawyer";
import { paymentController } from "../dependencyInjection/lawyer";

router.post("/signup", upload.array("files", 2), (req, res) =>
  lawyerAuthController.registerLawyer(req as IMulterRequest, res),
);

router.post("/signin", (req, res) =>
  lawyerAuthController.siginLawyer(req, res, authCookieService),
);

router.post("/logout", (req, res) => lawyerAuthController.logout(req, res));

router.post("/forgot-password-email", (req, res) =>
  lawyerAuthController.forgotPassword(req, res),
);

router.post("/new-password", (req, res) =>
  lawyerAuthController.changePassword(req, res),
);

router.post(
  "/reset-password",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerAuthController.resetPassword(req, res),
);

router.post(
  "/add-profile",
  verifyToken,
  verifyRole(["lawyer"]),
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "barCouncilCertificate", maxCount: 1 },
    { name: "degreeCertificate", maxCount: 1 },
    { name: "experienceCertificate", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
  ]),
  (req, res) => lawyerProfileController.addLawyerProfile(req, res),
);

router.get(
  "/get-profile/:lawyerId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerProfileController.getLawyerProfile(req, res),
);

router.patch(
  "/edit-profile",
  verifyToken,
  verifyRole(["lawyer"]),
  upload.single("profileImage"),
  (req, res) => lawyerProfileController.editLawyerProfile(req, res),
);

router.post(
  "/add-slot/:lawyerId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.addSlot(req, res),
);

router.get(
  "/get-slots/:lawyerId/:type",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getSlot(req, res),
);

router.patch(
  "/update-rule-status/:ruleId/:ruleStatus",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.updateRuleStatus(req, res),
);

router.get(
  "/get-appointments/:lawyerId/:appointmentStatus/:startIndex/:limit",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getAppointments(req, res),
);

router.patch(
  "/appointment/:appointmentId/:appointmentStatus/:lawyerId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.updateAppointmentStatus(req, res),
);

router.get(
  "/get-profile-image/:lawyerId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerProfileController.getLawyerProfileImage(req, res),
);

router.get(
  "/subscription-plans",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getSubscriptionPlan(req, res),
);

router.post(
  "/create-razorpay-order",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => paymentController.createRazorpayOrder(req, res),
);

router.post(
  "/verify-payment",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => paymentController.verifyPayment(req, res),
);

router.post(
  "/add-plan/:lawyerId/:planId/:price",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.addPlan(req, res),
);

router.get(
  "/get-all-chats/:lawyerId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getAllChats(req, res),
);

router.get(
  "/get-chat/:lawyerId/:userId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getChat(req, res),
);

router.get(
  "/get-user-chat-profile/:userId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getUserChatProfile(req, res),
);

router.post(
  "/update-chat-read-status/:lawyerId/:userId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.updateChatReadStatus(req, res),
);

router.post(
  "/add-bank-account",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.addBankAccount(req, res),
);

router.get(
  "/get-summary/:lawyerId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getSummary(req, res),
);

router.get(
  "/check-bank-details/:lawyerId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.checkBankDetails(req, res),
);

router.post(
  "/start-meeting/:appointmentId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.startMeeting(req, res),
);

router.post(
  "/add-notes/:appointmentId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.addNotes(req, res),
);

router.post(
  "/add-feedback/:appointmentId",
  verifyToken,
  verifyRole(["lawyer", "user"]),
  (req, res) => lawyerController.addReview(req, res),
);

router.get(
  "/get-consultation-history/:caseId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.getConsultationHistory(req, res),
);

router.get(
  "/find-starter-plan/:lawyerId",
  verifyToken,
  verifyRole(["lawyer"]),
  (req, res) => lawyerController.findStarterPlan(req, res),
);

export default router;
