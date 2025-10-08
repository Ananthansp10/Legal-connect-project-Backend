import { ISlotRequestDto } from "../../domain/dtos/slotDtos";

export class SlotMapper {
  static toResponse(data: ISlotRequestDto) {
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
