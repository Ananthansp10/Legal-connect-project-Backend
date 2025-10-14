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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LawyerProfileMapper = void 0;
class LawyerProfileMapper {
  static toRequest(data, imageUrl) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return {
        lawyerId: data.lawyerId,
        personalInfo: {
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          DOB: data.DOB,
          gender: data.gender,
          address: {
            street: data.street,
            country: data.country,
            state: data.state,
            city: data.city,
          },
          language: data.language,
          profileImage: imageUrl.profileImage[0].path,
        },
        proffessionalInfo: {
          practiceAreas: data.practiceAreas,
          barRegisterNumber: data.barRegisterNumber,
          experience: data.experience,
          courtName: data.courtName,
          workLocation: data.workLocation,
          fee: data.fee,
          availableDays: data.availableDays,
          startTime: data.startTime,
          endTime: data.endTime,
          education: data.education,
          documents: [
            ((_b =
              (_a = imageUrl.barCouncilCertificate) === null || _a === void 0
                ? void 0
                : _a[0]) === null || _b === void 0
              ? void 0
              : _b.path) || "",
            ((_d =
              (_c = imageUrl.degreeCertificate) === null || _c === void 0
                ? void 0
                : _c[0]) === null || _d === void 0
              ? void 0
              : _d.path) || "",
            ((_f =
              (_e = imageUrl.experienceCertificate) === null || _e === void 0
                ? void 0
                : _e[0]) === null || _f === void 0
              ? void 0
              : _f.path) || "",
            ((_h =
              (_g = imageUrl.idProof) === null || _g === void 0
                ? void 0
                : _g[0]) === null || _h === void 0
              ? void 0
              : _h.path) || "",
          ],
        },
      };
    });
  }
}
exports.LawyerProfileMapper = LawyerProfileMapper;
