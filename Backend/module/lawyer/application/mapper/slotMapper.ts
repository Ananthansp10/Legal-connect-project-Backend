import { SlotRequestDto } from "../../domain/dtos/slotDtos";



export class SlotMapper {

    static toResponse(data: SlotRequestDto) {
        return {
            lawyerId: data.lawyerId,
            availablity: [{ date: new Date(data.date).toISOString().split('T')[0], timeSlots: data.timeSlots }]
        }
    }
}