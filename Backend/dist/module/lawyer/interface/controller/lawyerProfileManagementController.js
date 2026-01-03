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
exports.LawyerProfileController = void 0;
const AppEnumError_1 = require("../../../../common/error/AppEnumError");
const AppStatusCode_1 = require("../../../../common/statusCode/AppStatusCode");
const mongoose_1 = __importDefault(require("mongoose"));
class LawyerProfileController {
  constructor(
    _lawyerAddProfileApplication,
    _lawyerGetProfileApplication,
    _lawyerEditProfileApplication,
    _getLawyerProfileImageUseCase,
  ) {
    this._lawyerAddProfileApplication = _lawyerAddProfileApplication;
    this._lawyerGetProfileApplication = _lawyerGetProfileApplication;
    this._lawyerEditProfileApplication = _lawyerEditProfileApplication;
    this._getLawyerProfileImageUseCase = _getLawyerProfileImageUseCase;
  }
  addLawyerProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e;
      try {
        const files = req.files;
        const imageUrls = {
          profileImage:
            ((_a = files.profileImage) === null || _a === void 0
              ? void 0
              : _a.map((file) => ({ path: file.path }))) || [],
          barCouncilCertificate:
            (_b = files.barCouncilCertificate) === null || _b === void 0
              ? void 0
              : _b.map((file) => ({
                  path: file.path,
                })),
          degreeCertificate:
            (_c = files.degreeCertificate) === null || _c === void 0
              ? void 0
              : _c.map((file) => ({
                  path: file.path,
                })),
          experienceCertificate:
            (_d = files.experienceCertificate) === null || _d === void 0
              ? void 0
              : _d.map((file) => ({
                  path: file.path,
                })),
          idProof:
            (_e = files.idProof) === null || _e === void 0
              ? void 0
              : _e.map((file) => ({ path: file.path })),
        };
        yield this._lawyerAddProfileApplication.execute(req.body, imageUrls);
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Profile added successfully" });
      } catch (_error) {
        res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
          success: false,
          message: AppEnumError_1.AppError.UNKNOWN_ERROR,
        });
      }
    });
  }
  getLawyerProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._lawyerGetProfileApplication.execute(
          req.params.lawyerId,
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Data found successfully",
          data: result,
        });
      } catch (_error) {
        res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
          sucess: false,
          message: AppEnumError_1.AppError.UNKNOWN_ERROR,
        });
      }
    });
  }
  editLawyerProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      try {
        const imageUrl =
          (_a = req === null || req === void 0 ? void 0 : req.file) === null ||
          _a === void 0
            ? void 0
            : _a.path;
        yield this._lawyerEditProfileApplication.execute(req.body, imageUrl);
        res
          .status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE)
          .json({ success: true, message: "Profile edited successfully" });
      } catch (_error) {
        res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
          success: false,
          message: AppEnumError_1.AppError.UNKNOWN_ERROR,
        });
      }
    });
  }
  getLawyerProfileImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this._getLawyerProfileImageUseCase.execute(
          new mongoose_1.default.Types.ObjectId(req.params.lawyerId),
        );
        res.status(AppStatusCode_1.AppStatusCode.SUCCESS_CODE).json({
          success: true,
          message: "Profile image found successfully",
          data: result,
        });
      } catch (_error) {
        res.status(AppStatusCode_1.AppStatusCode.INTERNAL_ERROR_CODE).json({
          success: false,
          message: AppEnumError_1.AppError.UNKNOWN_ERROR,
        });
      }
    });
  }
}
exports.LawyerProfileController = LawyerProfileController;
