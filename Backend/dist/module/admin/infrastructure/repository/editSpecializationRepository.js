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
exports.EditSpecializationRepository = void 0;
const specializationModel_1 = require("../models/specializationModel");
class EditSpecializationRepository {
  editSpecialization(specId, data) {
    return __awaiter(this, void 0, void 0, function* () {
      yield specializationModel_1.specializationModel.findByIdAndUpdate(
        specId,
        { $set: data },
      );
    });
  }
}
exports.EditSpecializationRepository = EditSpecializationRepository;
