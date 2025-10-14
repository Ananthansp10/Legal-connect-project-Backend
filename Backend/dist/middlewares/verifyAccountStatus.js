"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccountStatus = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppStatusCode_1 = require("../common/statusCode/AppStatusCode");
const AppEnumError_1 = require("../common/error/AppEnumError");
const verifyAccountStatus = (userAccountCheckRepo) => {
  return function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      const token =
        (_a = req === null || req === void 0 ? void 0 : req.cookies) === null ||
        _a === void 0
          ? void 0
          : _a.accessToken;
      const decodeToken = jsonwebtoken_1.default.decode(token);
      const userId = decodeToken.id;
      const findUser = yield userAccountCheckRepo.findById(userId);
      if (findUser && findUser.isBlock) {
        res.status(AppStatusCode_1.AppStatusCode.ACCOUNT_BLOCKED).json({
          success: false,
          message: AppEnumError_1.AppError.ACCOUNT_BLOCKED,
          isBlock: true,
        });
        return;
      }
      return next();
    });
  };
};
exports.verifyAccountStatus = verifyAccountStatus;
