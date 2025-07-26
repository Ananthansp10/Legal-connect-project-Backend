import { SlotRequestDto } from "../../domain/dtos/slotDtos";



export class SlotMapper{

    static toResponse(data:SlotRequestDto){
        return {
            lawyerId:data.lawyerId,
            availablity:[{date:data.date,timeSlots:data.timeSlots}]
        }
    }
}