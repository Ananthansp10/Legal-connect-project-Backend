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
exports.generateSlots = generateSlots;
const dayjs_1 = __importDefault(require("dayjs"));
const customParseFormat_js_1 = __importDefault(
  require("dayjs/plugin/customParseFormat.js"),
);
const isSameOrBefore_js_1 = __importDefault(
  require("dayjs/plugin/isSameOrBefore.js"),
);
const isSameOrAfter_js_1 = __importDefault(
  require("dayjs/plugin/isSameOrAfter.js"),
);
dayjs_1.default.extend(customParseFormat_js_1.default);
dayjs_1.default.extend(isSameOrBefore_js_1.default);
dayjs_1.default.extend(isSameOrAfter_js_1.default);
function generateSlots(rule, lawyerId, date, slotRepo) {
  return __awaiter(this, void 0, void 0, function* () {
    const { startTime, endTime, breakTimes, days } = rule;
    let slots = [];
    const dayOfWeek = (0, dayjs_1.default)(date).format("ddd").toLowerCase();
    if (!days.includes(dayOfWeek)) {
      return [];
    }
    let start = (0, dayjs_1.default)(startTime, "h:mm A");
    let end = (0, dayjs_1.default)(endTime, "h:mm A");
    while (start.add(30, "minute").isSameOrBefore(end)) {
      let slotEnd = start.add(30, "minute");
      let isInBreak =
        breakTimes === null || breakTimes === void 0
          ? void 0
          : breakTimes.some((breakObj) => {
              let breakStart = (0, dayjs_1.default)(
                breakObj.startTime,
                "h:mm A",
              );
              let breakEnd = (0, dayjs_1.default)(breakObj.endTime, "h:mm A");
              return (
                (start.isSameOrAfter(breakStart) && start.isBefore(breakEnd)) ||
                (slotEnd.isAfter(breakStart) &&
                  slotEnd.isSameOrBefore(breakEnd)) ||
                (start.isBefore(breakStart) && slotEnd.isAfter(breakEnd))
              );
            });
      if (!isInBreak) {
        let time = `${start.format("h:mm A")}-${slotEnd.format("h:mm A")}`;
        let slotExist = yield slotRepo.findAppointmentSlot(
          lawyerId,
          date,
          time,
        );
        slots.push({
          startTime: start.format("h:mm A"),
          endTime: slotEnd.format("h:mm A"),
          isBooked: slotExist ? true : false,
        });
        start = slotEnd.add(15, "minute");
      } else {
        let overlappingBreak = breakTimes.find((b) => {
          let breakStart = (0, dayjs_1.default)(b.startTime, "h:mm A");
          let breakEnd = (0, dayjs_1.default)(b.endTime, "h:mm A");
          return start.isBefore(breakEnd) && slotEnd.isAfter(breakStart);
        });
        if (overlappingBreak) {
          start = (0, dayjs_1.default)(overlappingBreak.endTime, "h:mm A");
        } else {
          start = slotEnd.add(15, "minute");
        }
      }
    }
    return slots;
  });
}
