import { Types } from "mongoose";
import { IGetLawyerSlotRepository } from "../../interface/repository/IgetLawyerSlotRepository";
import { IGetLawyerSlotApplication } from "../use-case-interface/IGetLawyerSlotApplication";
import { ISlotResponseDto } from "../../domain/dtos/slotResponseDto";



export class GetLawyerSlotApplication implements IGetLawyerSlotApplication{

    constructor(
        private getLawyerSlotRepo:IGetLawyerSlotRepository
    ){}
}