"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multerConfig_1 = __importDefault(require("../config/multerConfig"));
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const verifyRoleMiddleware_1 = require("../middlewares/verifyRoleMiddleware");
const lawyer_1 = require("../dependencyInjection/lawyer");
const lawyer_2 = require("../dependencyInjection/lawyer");
const lawyer_3 = require("../dependencyInjection/lawyer");
const lawyer_4 = require("../dependencyInjection/lawyer");
const lawyer_5 = require("../dependencyInjection/lawyer");
router.post("/signup", multerConfig_1.default.array("files", 2), (req, res) =>
  lawyer_1.lawyerAuthController.registerLawyer(req, res),
);
router.post("/signin", (req, res) =>
  lawyer_1.lawyerAuthController.siginLawyer(
    req,
    res,
    lawyer_4.authCookieService,
  ),
);
router.post("/logout", (req, res) =>
  lawyer_1.lawyerAuthController.logout(req, res),
);
router.post("/forgot-password-email", (req, res) =>
  lawyer_1.lawyerAuthController.forgotPassword(req, res),
);
router.post("/new-password", (req, res) =>
  lawyer_1.lawyerAuthController.changePassword(req, res),
);
router.post(
  "/reset-password",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_1.lawyerAuthController.resetPassword(req, res),
);
router.post(
  "/add-profile",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  multerConfig_1.default.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "barCouncilCertificate", maxCount: 1 },
    { name: "degreeCertificate", maxCount: 1 },
    { name: "experienceCertificate", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
  ]),
  (req, res) => lawyer_3.lawyerProfileController.addLawyerProfile(req, res),
);
router.get(
  "/get-profile/:lawyerId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_3.lawyerProfileController.getLawyerProfile(req, res),
);
router.patch(
  "/edit-profile",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  multerConfig_1.default.single("profileImage"),
  (req, res) => lawyer_3.lawyerProfileController.editLawyerProfile(req, res),
);
router.post(
  "/add-slot/:lawyerId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.addSlot(req, res),
);
router.get(
  "/get-slots/:lawyerId/:type",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.getSlot(req, res),
);
router.patch(
  "/update-rule-status/:ruleId/:ruleStatus",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.updateRuleStatus(req, res),
);
router.get(
  "/get-appointments/:lawyerId/:appointmentStatus/:startIndex/:limit",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.getAppointments(req, res),
);
router.patch(
  "/appointment/:appointmentId/:appointmentStatus/:lawyerId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.updateAppointmentStatus(req, res),
);
router.get(
  "/get-profile-image/:lawyerId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) =>
    lawyer_3.lawyerProfileController.getLawyerProfileImage(req, res),
);
router.get(
  "/subscription-plans",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.getSubscriptionPlan(req, res),
);
router.post(
  "/create-razorpay-order",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_5.paymentController.createRazorpayOrder(req, res),
);
router.post(
  "/verify-payment",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_5.paymentController.verifyPayment(req, res),
);
router.post(
  "/add-plan/:lawyerId/:planId/:price",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.addPlan(req, res),
);
router.get(
  "/get-all-chats/:lawyerId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.getAllChats(req, res),
);
router.get(
  "/get-chat/:lawyerId/:userId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.getChat(req, res),
);
router.get(
  "/get-user-chat-profile/:userId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.getUserChatProfile(req, res),
);
router.post(
  "/update-chat-read-status/:lawyerId/:userId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.updateChatReadStatus(req, res),
);
router.post(
  "/add-bank-account",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.addBankAccount(req, res),
);
router.get(
  "/get-summary/:lawyerId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.getSummary(req, res),
);
router.get(
  "/check-bank-details/:lawyerId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.checkBankDetails(req, res),
);
router.post(
  "/start-meeting/:appointmentId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.startMeeting(req, res),
);
router.post(
  "/add-notes/:appointmentId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.addNotes(req, res),
);
router.post(
  "/add-feedback/:appointmentId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer", "user"]),
  (req, res) => lawyer_2.lawyerController.addReview(req, res),
);
router.get(
  "/get-consultation-history/:caseId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.getConsultationHistory(req, res),
);
router.get(
  "/find-starter-plan/:lawyerId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.findStarterPlan(req, res),
);
router.get(
  "/search-appointment/:lawyerId/:userName",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.searchAppointment(req, res),
);
router.get(
  "/get-purchased-plans/:lawyerId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["lawyer"]),
  (req, res) => lawyer_2.lawyerController.getPurchasedPlans(req, res),
);
exports.default = router;
