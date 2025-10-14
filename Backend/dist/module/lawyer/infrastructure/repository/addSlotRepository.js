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
exports.AddSlotRepository = void 0;
const slotAvailablityModel_1 = require("../models/slotAvailablityModel");
class AddSlotRepository {
  addSlot(data) {
    return __awaiter(this, void 0, void 0, function* () {
      yield slotAvailablityModel_1.availableSlotModel.create(
        Object.assign(Object.assign({}, data), { status: true }),
      );
    });
  }
}
exports.AddSlotRepository = AddSlotRepository;
