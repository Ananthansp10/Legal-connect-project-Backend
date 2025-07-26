import { AppException } from "../../../../common/error/errorException";
import { SlotRequestDto } from "../../domain/dtos/slotDtos";
import { ISlotAvailablityEntity } from "../../domain/entity/slotAvailablityEntity";
import { IAddSlotRepositorie } from "../../interface/repositorie/addSlotRepositorie";
import { IAddSlotApplication } from "../use-case-interface/IAddSlotApplication";
import { SlotMapper } from "../mapper/slotMapper";


export class AddSlotApplication implements IAddSlotApplication{

    constructor(
        private addSlotRepo:IAddSlotRepositorie
    ){}

    async execute(data:SlotRequestDto): Promise<void> {
        try {
            let lawyerIdExist:ISlotAvailablityEntity | null=await this.addSlotRepo.findSlot(data.lawyerId)
            if(lawyerIdExist){
                let checkDateExist:boolean=lawyerIdExist.availablity.some((slot)=>{
                    let dbDate=new Date(slot.date).toISOString().split('T')[0]
                    let newDate=new Date(data.date).toISOString().split('T')[0]
                    return dbDate==newDate
                })
                if(checkDateExist){
                    const timesOfDate=lawyerIdExist.availablity.filter((slot)=>new Date(slot.date).toISOString().split('T')[0]==new Date(data.date).toISOString().split('T')[0])
                    const timeExist:boolean=timesOfDate.some((slot)=>{
                    return slot.timeSlots.some((time)=>{
                        return data.timeSlots.some((newTime)=>{
                            if(newTime.startTime==time.startTime){
                                return true
                            }
                        })
                    })
                })
                        if(timeExist){
                            throw new AppException("Time already exist")
                        }
                }else{
                    let newSlotObj={
                        date:data.date,
                        timeSlots:data.timeSlots
                    }
                    await this.addSlotRepo.addNewSlot(data.lawyerId,newSlotObj)
                }
            }else{
                let slotObj=SlotMapper.toResponse(data)
                await this.addSlotRepo.addSlot(slotObj)
            }
        } catch (error) {
            throw error;
        }
    }
}