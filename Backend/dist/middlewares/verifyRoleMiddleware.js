"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppStatusCode_1 = require("../common/statusCode/AppStatusCode");
const verifyRole = ([...role]) => {
  return function (req, res, next) {
    const token = req.cookies.accessToken;
    const decodeToken = jsonwebtoken_1.default.decode(token);
    if (!role.includes(decodeToken.role)) {
      res
        .status(AppStatusCode_1.AppStatusCode.ACCOUNT_BLOCKED)
        .json({ success: false, message: "Access Denied", isUnAuth: true });
      return;
    }
    return next();
  };
};
exports.verifyRole = verifyRole;
