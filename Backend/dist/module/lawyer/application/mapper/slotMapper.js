"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotMapper = void 0;
class SlotMapper {
  static toResponse(data) {
    return {
      lawyerId: data.lawyerId,
      availablity: [
        {
          date: new Date(data.date).toISOString().split("T")[0],
          timeSlots: data.timeSlots,
        },
      ],
    };
  }
}
exports.SlotMapper = SlotMapper;
