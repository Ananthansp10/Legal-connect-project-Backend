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
exports.GetSummaryReportUseCase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class GetSummaryReportUseCase {
  constructor(_summaryReportRepo) {
    this._summaryReportRepo = _summaryReportRepo;
  }
  execute() {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      try {
        const totalUsers = (yield this._summaryReportRepo.getTotalUsers()) || 0;
        const totalLawyers =
          (yield this._summaryReportRepo.getTotalLawyers()) || 0;
        const todaysAppointments =
          (yield this._summaryReportRepo.getTodaysAppointments()) || 0;
        const pendingVerification =
          (yield this._summaryReportRepo.getTotalUnverifiedLawyers()) || 0;
        const revenueChart =
          (yield this._summaryReportRepo.getRevenueChart()) || [];
        const weeklyAppointments =
          yield this._summaryReportRepo.getWeeklyAppointments();
        const specializationChart =
          yield this._summaryReportRepo.getSpecializationChart();
        const lawyers = yield this._summaryReportRepo.getLawyers();
        const topLawyers = yield Promise.all(
          (_a = lawyers !== null && lawyers !== void 0 ? lawyers : []) ===
            null || _a === void 0
            ? void 0
            : _a.map((data) =>
                __awaiter(this, void 0, void 0, function* () {
                  var _a, _b, _c;
                  const lawyerProfile =
                    yield this._summaryReportRepo.getLawyerProfile(
                      new mongoose_1.default.Types.ObjectId(data._id),
                    );
                  const lawyerAppointments =
                    yield this._summaryReportRepo.getLawyerApppointments(
                      new mongoose_1.default.Types.ObjectId(data._id),
                    );
                  const lawyerRating =
                    yield this._summaryReportRepo.getLawyerRating(
                      new mongoose_1.default.Types.ObjectId(data._id),
                    );
                  return {
                    name:
                      (_a =
                        lawyerProfile === null || lawyerProfile === void 0
                          ? void 0
                          : lawyerProfile.personalInfo.name) !== null &&
                      _a !== void 0
                        ? _a
                        : "",
                    profileImage:
                      (_b =
                        lawyerProfile === null || lawyerProfile === void 0
                          ? void 0
                          : lawyerProfile.personalInfo.profileImage) !== null &&
                      _b !== void 0
                        ? _b
                        : "",
                    specialization:
                      (_c =
                        lawyerProfile === null || lawyerProfile === void 0
                          ? void 0
                          : lawyerProfile.proffessionalInfo
                              .practiceAreas[0]) !== null && _c !== void 0
                        ? _c
                        : "",
                    totalConsultation:
                      (lawyerAppointments === null ||
                      lawyerAppointments === void 0
                        ? void 0
                        : lawyerAppointments.length) || 0,
                    rating: (
                      lawyerRating === null || lawyerRating === void 0
                        ? void 0
                        : lawyerRating.reviews
                    )
                      ? Math.floor(
                          lawyerRating.reviews.reduce(
                            (acc, rev) => acc + rev.rating,
                            0,
                          ) / lawyerRating.reviews.length,
                        )
                      : 0,
                  };
                }),
              ),
        );
        const users = yield this._summaryReportRepo.getUsers();
        const topUsers = yield Promise.all(
          (users !== null && users !== void 0 ? users : []).map((data) =>
            __awaiter(this, void 0, void 0, function* () {
              var _a, _b, _c, _d;
              const userProfile = yield this._summaryReportRepo.getUserProfile(
                new mongoose_1.default.Types.ObjectId(data._id),
              );
              const userAppointments =
                yield this._summaryReportRepo.getUserAppointments(
                  new mongoose_1.default.Types.ObjectId(data._id),
                );
              return {
                name:
                  (_a =
                    userProfile === null || userProfile === void 0
                      ? void 0
                      : userProfile.name) !== null && _a !== void 0
                    ? _a
                    : "",
                profileImage:
                  (_b =
                    userProfile === null || userProfile === void 0
                      ? void 0
                      : userProfile.profileImage) !== null && _b !== void 0
                    ? _b
                    : "",
                country:
                  (_c =
                    userProfile === null || userProfile === void 0
                      ? void 0
                      : userProfile.address.country) !== null && _c !== void 0
                    ? _c
                    : "",
                state:
                  (_d =
                    userProfile === null || userProfile === void 0
                      ? void 0
                      : userProfile.address.state) !== null && _d !== void 0
                    ? _d
                    : "",
                totalConsultation:
                  (userAppointments === null || userAppointments === void 0
                    ? void 0
                    : userAppointments.length) || 0,
              };
            }),
          ),
        );
        const stateChart = yield this._summaryReportRepo.getStateChart();
        const countryChart = yield this._summaryReportRepo.getCountryChart();
        return {
          totalUsers,
          totalLawyers,
          todaysAppointments,
          pendingVerification,
          revenueChart,
          weeklyAppointments:
            (weeklyAppointments === null || weeklyAppointments === void 0
              ? void 0
              : weeklyAppointments.map((appointments) => {
                  return {
                    dayName: appointments.dayName,
                    appointmentsCount: appointments.appointmentsCount,
                  };
                })) || [],
          specializationChart:
            (specializationChart === null || specializationChart === void 0
              ? void 0
              : specializationChart[0].specializations.map((data) => {
                  var _a;
                  return {
                    specializationName: data._id,
                    average: data.count
                      ? Math.floor(
                          data.count /
                            specializationChart[0].totalLawyers[0].totalLawyers,
                        ) *
                          100 ==
                        0
                        ? (_a = data._id) === null || _a === void 0
                          ? void 0
                          : _a.length
                        : Math.floor(
                            data.count /
                              specializationChart[0].totalLawyers[0]
                                .totalLawyers,
                          ) * 100
                      : 0,
                  };
                })) || [],
          topLawyers: topLawyers
            .sort((a, b) => b.totalConsultation - a.totalConsultation)
            .slice(0, 3),
          topUsers: topUsers
            .sort((a, b) => b.totalConsultation - a.totalConsultation)
            .slice(0, 3),
          stateChart: stateChart || [],
          countryChart: countryChart || [],
        };
      } catch (error) {
        throw error;
      }
    });
  }
}
exports.GetSummaryReportUseCase = GetSummaryReportUseCase;
