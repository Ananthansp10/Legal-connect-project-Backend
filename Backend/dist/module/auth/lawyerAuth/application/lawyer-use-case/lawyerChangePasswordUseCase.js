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
exports.LawyerChangePasswordUseCase = void 0;
const errorException_1 = require("../../../../../common/error/errorException");
const AppStatusCode_1 = require("../../../../../common/statusCode/AppStatusCode");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LawyerChangePasswordUseCase {
  constructor(_changePasswordRepo, _hashService) {
    this._changePasswordRepo = _changePasswordRepo;
    this._hashService = _hashService;
  }
  changePassword(email, password, token) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      try {
        const decodeToken = jsonwebtoken_1.default.decode(token);
        if (
          Date.now() >
          ((_a = decodeToken.exp) !== null && _a !== void 0 ? _a : 0) * 1000
        ) {
          throw new errorException_1.AppException(
            "Link has Expired try again",
            AppStatusCode_1.AppStatusCode.EXPIRED,
          );
        }
        jsonwebtoken_1.default.verify(
          token,
          process.env.FORGOT_PASSWORD_TOKEN_SECRET,
        );
        const hashedPassword = yield this._hashService.hash(password);
        yield this._changePasswordRepo.changePassword(email, hashedPassword);
      } catch (error) {
        throw error;
      }
    });
  }
}
exports.LawyerChangePasswordUseCase = LawyerChangePasswordUseCase;
