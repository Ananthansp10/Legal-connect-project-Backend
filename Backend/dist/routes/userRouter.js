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
const passport_1 = __importDefault(require("../config/passport"));
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const verifyRoleMiddleware_1 = require("../middlewares/verifyRoleMiddleware");
const verifyAccountStatus_1 = require("../middlewares/verifyAccountStatus");
const user_1 = require("../dependencyInjection/user");
const user_2 = require("../dependencyInjection/user");
const user_3 = require("../dependencyInjection/user");
const user_4 = require("../dependencyInjection/user");
const user_5 = require("../dependencyInjection/user");
const user_6 = require("../dependencyInjection/user");
router.post("/signup", (req, res) =>
  user_1.userAuthController.registerUser(req, res),
);
router.post("/otp-verification", (req, res) =>
  user_1.userAuthController.verifyOtp(req, res),
);
router.post("/resend-otp", (req, res) =>
  user_1.userAuthController.resendOtp(req, res),
);
router.post("/forgot-password", (req, res) =>
  user_1.userAuthController.forgotPassword(req, res),
);
router.post("/change-password", (req, res) =>
  user_1.userAuthController.changePassword(req, res),
);
router.post("/signin", (req, res) =>
  user_1.userAuthController.signin(req, res, user_5.cookieTokenService),
);
router.get(
  "/auth/google",
  passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);
router.get(
  "/auth/google/callback",
  passport_1.default.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/googleFail",
  }),
  (req, res) =>
    user_1.userAuthController.googleAuthentication(
      req,
      res,
      user_5.cookieTokenService,
    ),
);
router.get("/getGoogleAuthDetails", (req, res) =>
  user_1.userAuthController.getGoogleAuthDetails(req, res),
);
router.post("/logout", (req, res) =>
  user_1.userAuthController.logout(req, res),
);
router.post(
  "/reset-password",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_1.userAuthController.resetPassword(req, res),
);
router.post(
  "/add-profile",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  multerConfig_1.default.single("profileImage"),
  (req, res) => user_3.userProfileController.addProfile(req, res),
);
router.get(
  "/get-profile/:userId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_3.userProfileController.getUserProfile(req, res),
);
router.put(
  "/edit-profile",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  multerConfig_1.default.single("profileImage"),
  (req, res) => user_3.userProfileController.editUserProfile(req, res),
);
router.get(
  "/get-lawyers",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.getLawyers(req, res),
);
router.get(
  "/get-lawyer-details/:lawyerId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.getLawyerDetails(req, res),
);
router.get(
  "/get-slot-details/:lawyerId/:date",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.getSlotDetails(req, res),
);
router.get(
  "/filter-lawyer/:specialization",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.filterLawyerBySpecialization(req, res),
);
router.get(
  "/search-lawyer/:name",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.searchLawyerByName(req, res),
);
router.post(
  "/book-appointment/:caseId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.bookAppointment(req, res),
);
router.get(
  "/get-appointments/:userId/:appointmentStatus/:startIndex/:limit",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.getAppointment(req, res),
);
router.post(
  "/create-order",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_4.paymentController.createOrder(req, res),
);
router.post("/verify-payment", (req, res) =>
  user_4.paymentController.verifyPayment(req, res),
);
router.post(
  "/cancel-appointment/:appointmentId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.cancelAppointment(req, res),
);
router.get(
  "/get-todays-appointments/:userId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.getTodaysAppointments(req, res),
);
router.post(
  "/reshedule-appointment/:appointmentId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.resheduleAppointment(req, res),
);
router.post(
  "/report-lawyer",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user", "lawyer"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.reportLawyer(req, res),
);
router.get(
  "/get-user-chat/:userId/:lawyerId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.getUserChat(req, res),
);
router.get(
  "/get-user-all-chats/:userId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.getUserAllChats(req, res),
);
router.get(
  "/get-lawyer-chat-profile/:lawyerId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.getLawyerChatProfile(req, res),
);
router.post(
  "/add-review/:lawyerId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.addReview(req, res),
);
router.get(
  "/get-review/:lawyerId",
  verifyTokenMiddleware_1.verifyToken,
  (0, verifyRoleMiddleware_1.verifyRole)(["user", "lawyer"]),
  (0, verifyAccountStatus_1.verifyAccountStatus)(
    user_6.checkUserAccountStatusMongoRepo,
  ),
  (req, res) => user_2.userController.getReview(req, res),
);
router.get("/get-top-lawyers", (req, res) =>
  user_2.userController.getLawyers(req, res),
);
exports.default = router;
