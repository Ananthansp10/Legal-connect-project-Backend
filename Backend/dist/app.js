"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const lawyerRouter_1 = __importDefault(require("./routes/lawyerRouter"));
const adminRouter_1 = __importDefault(require("./routes/adminRouter"));
const commonRouter_1 = __importDefault(require("./routes/commonRouter"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const rfs = __importStar(require("rotating-file-stream"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const socketIo_1 = require("./config/socketIo");
const subscriptionPlanSheduler_1 = require("./module/lawyer/infrastructure/sheduler/subscriptionPlanSheduler");
const subscriptionPlanSheduler_2 = require("./module/lawyer/infrastructure/sheduler/subscriptionPlanSheduler");
dotenv_1.default.config();
(0, subscriptionPlanSheduler_1.activatePlan)();
(0, subscriptionPlanSheduler_2.expirePlan)();
exports.server = http_1.default.createServer(app);
(0, socketIo_1.initSocket)(exports.server);
const logDirectory = path_1.default.join(process.cwd(), "logs");
if (!fs_1.default.existsSync(logDirectory)) {
  fs_1.default.mkdirSync(logDirectory, { recursive: true });
}
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
  maxFiles: 7,
});
app.use(
  (0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
//app.use(morgan('dev'))
app.use((0, morgan_1.default)("combined", { stream: accessLogStream }));
app.use("/api/user", userRouter_1.default);
app.use("/api/lawyer", lawyerRouter_1.default);
app.use("/api/admin", adminRouter_1.default);
app.use("/api/common", commonRouter_1.default);
exports.default = app;
