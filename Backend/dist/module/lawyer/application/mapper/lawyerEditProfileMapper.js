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
exports.EditLawyerProfileMapper = void 0;
class EditLawyerProfileMapper {
  static toResponse(data, imageUrl) {
    return __awaiter(this, void 0, void 0, function* () {
      return {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        DOB: data.DOB,
        language: data.language,
        profileImage: imageUrl ? imageUrl : data.imagePreview,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          country: data.country,
        },
        fee: data.fee,
      };
    });
  }
}
exports.EditLawyerProfileMapper = EditLawyerProfileMapper;
