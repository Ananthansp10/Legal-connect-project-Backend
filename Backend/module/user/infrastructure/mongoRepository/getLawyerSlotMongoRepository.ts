import { IGetLawyerSlotRepository } from "../../interface/repository/IgetLawyerSlotRepository";



export class GetLawyerSlotRepository implements IGetLawyerSlotRepository{

    // async getLawyerSlotDetails(lawyerId: string, date:string): Promise<ISlotResponseDto[] | null> {

    //     let doc= await availableSlotModel.findOne({lawyerId:lawyerId,'availablity.date':date})

    //     if(doc){
    //         let matchedDoc:ISlotResponseDto | undefined=doc.availablity.find((slot)=>slot.date==date)
    //         if(matchedDoc){
    //             return [matchedDoc]
    //         }else{
    //             return null
    //         }
    //     }else{
    //         return null
    //     }
    // }
}