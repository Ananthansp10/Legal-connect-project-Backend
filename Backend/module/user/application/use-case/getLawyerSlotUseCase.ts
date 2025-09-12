import { Types } from "mongoose";
import { IGetLawyerSlotRepository } from "../../infrastructure/repositoryInterface/IgetLawyerSlotRepository";
import { IGetLawyerSlotUseCase } from "../use-case-interface/IGetLawyerSlotUseCase";
import { ISlotResponseDto } from "../../domain/dtos/slotResponseDto";
import { generateSlots } from "../../infrastructure/services/generateTimesSlots";


interface SlotData{
    startTime:string;
    endTime:string;
    isBooked:boolean
}


export class GetLawyerSlotUseCase implements IGetLawyerSlotUseCase{

    constructor(
        private _getLawyerSlotRepo:IGetLawyerSlotRepository
    ){}

    async execute(lawyerId: Types.ObjectId, date: string): Promise<SlotData[] | undefined> {
        let rule=await this._getLawyerSlotRepo.findSlot(lawyerId,date)
        let mostPriorityRule=rule.sort((a,b)=>b.priority-a.priority)
        let slots
        if(mostPriorityRule.length>0){
            slots=generateSlots(mostPriorityRule[0],lawyerId,date,this._getLawyerSlotRepo)
        }
        return slots
    }
}