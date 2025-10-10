import express from "express";
const router = express.Router();
import upload from "../config/multerConfig";
import passport from "../config/passport";
import { verifyToken } from "../middlewares/verifyTokenMiddleware";
import { verifyRole } from "../middlewares/verifyRoleMiddleware";
import { verifyAccountStatus } from "../middlewares/verifyAccountStatus";
import { userAuthController } from "../dependencyInjection/user";
import { userController } from "../dependencyInjection/user";
import { userProfileController } from "../dependencyInjection/user";
import { paymentController } from "../dependencyInjection/user";
import { cookieTokenService } from "../dependencyInjection/user";
import { checkUserAccountStatusMongoRepo } from "../dependencyInjection/user";

router.post("/signup", (req, res) => userAuthController.registerUser(req, res));

router.post("/otp-verification", (req, res) =>
  userAuthController.verifyOtp(req, res),
);

router.post("/resend-otp", (req, res) =>
  userAuthController.resendOtp(req, res),
);

router.post("/forgot-password", (req, res) =>
  userAuthController.forgotPassword(req, res),
);

router.post("/change-password", (req, res) =>
  userAuthController.changePassword(req, res),
);

router.post("/signin", (req, res) =>
  userAuthController.signin(req, res, cookieTokenService),
);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/googleFail",
  }),
  (req, res) =>
    userAuthController.googleAuthentication(req, res, cookieTokenService),
);

router.get("/getGoogleAuthDetails", (req, res) =>
  userAuthController.getGoogleAuthDetails(req, res),
);

router.post("/logout", (req, res) => userAuthController.logout(req, res));

router.post(
  "/reset-password",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userAuthController.resetPassword(req, res),
);

router.post(
  "/add-profile",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  upload.single("profileImage"),
  (req, res) => userProfileController.addProfile(req, res),
);

router.get(
  "/get-profile/:userId",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userProfileController.getUserProfile(req, res),
);

router.put(
  "/edit-profile",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  upload.single("profileImage"),
  (req, res) => userProfileController.editUserProfile(req, res),
);

router.get(
  "/get-lawyers",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.getLawyers(req, res),
);

router.get(
  "/get-lawyer-details/:lawyerId",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.getLawyerDetails(req, res),
);

router.get(
  "/get-slot-details/:lawyerId/:date",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.getSlotDetails(req, res),
);

router.get(
  "/filter-lawyer/:specialization",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.filterLawyerBySpecialization(req, res),
);

router.get(
  "/search-lawyer/:name",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.searchLawyerByName(req, res),
);

router.post(
  "/book-appointment/:caseId",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.bookAppointment(req, res),
);

router.get(
  "/get-appointments/:userId/:appointmentStatus/:startIndex/:limit",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.getAppointment(req, res),
);

router.post(
  "/create-order",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => paymentController.createOrder(req, res),
);

router.post("/verify-payment", (req, res) =>
  paymentController.verifyPayment(req, res),
);

router.post(
  "/cancel-appointment/:appointmentId",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.cancelAppointment(req, res),
);

router.get(
  "/get-todays-appointments/:userId",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.getTodaysAppointments(req, res),
);

router.post(
  "/reshedule-appointment/:appointmentId",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.resheduleAppointment(req, res),
);

router.post(
  "/report-lawyer",
  verifyToken,
  verifyRole(["user", "lawyer"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.reportLawyer(req, res),
);

router.get(
  "/get-user-chat/:userId/:lawyerId",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.getUserChat(req, res),
);

router.get(
  "/get-user-all-chats/:userId",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.getUserAllChats(req, res),
);

router.get(
  "/get-lawyer-chat-profile/:lawyerId",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.getLawyerChatProfile(req, res),
);

router.post(
  "/add-review/:lawyerId",
  verifyToken,
  verifyRole(["user"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.addReview(req, res),
);

router.get(
  "/get-review/:lawyerId",
  verifyToken,
  verifyRole(["user", "lawyer"]),
  verifyAccountStatus(checkUserAccountStatusMongoRepo),
  (req, res) => userController.getReview(req, res),
);

router.get("/get-top-lawyers", (req, res) =>
  userController.getLawyers(req, res),
);

export default router;
