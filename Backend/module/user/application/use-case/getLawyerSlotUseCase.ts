import { Types } from "mongoose";
import { IGetLawyerSlotRepository } from "../../infrastructure/repositoryInterface/IgetLawyerSlotRepository";
import { IGetLawyerSlotUseCase, SlotDataResponseDto } from "../use-case-interface/IGetLawyerSlotUseCase";
import { generateSlots } from "../../infrastructure/services/generateTimesSlots";


export class GetLawyerSlotUseCase implements IGetLawyerSlotUseCase {

    constructor(
        private _getLawyerSlotRepo: IGetLawyerSlotRepository
    ) { }

    async execute(lawyerId: Types.ObjectId, date: string): Promise<SlotDataResponseDto[] | undefined> {
        const rule = await this._getLawyerSlotRepo.findSlot(lawyerId, date)
        const mostPriorityRule = rule.sort((a, b) => b.priority - a.priority)
        let slots
        if (mostPriorityRule.length > 0) {
            slots = generateSlots(mostPriorityRule[0], lawyerId, date, this._getLawyerSlotRepo)
        }
        return slots
    }
}