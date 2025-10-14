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
exports.BookAppointmentRepository = void 0;
const appointmentModel_1 = require("../models/appointmentModel");
const baseRepository_1 = require("./baseRepository");
class BookAppointmentRepository extends baseRepository_1.BaseRepository {
  constructor() {
    super(appointmentModel_1.appointmentModel);
  }
  findAppointmentExist(lawyerId, date, time) {
    return __awaiter(this, void 0, void 0, function* () {
      const result = yield appointmentModel_1.appointmentModel.findOne({
        lawyerId: lawyerId,
        date: date,
        time: time,
      });
      return result ? true : false;
    });
  }
}
exports.BookAppointmentRepository = BookAppointmentRepository;
