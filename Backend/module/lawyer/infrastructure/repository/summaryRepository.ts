import { Types } from "mongoose";
import { SummaryDto } from "../../domain/dtos/summaryDto";
import { ISummaryRepository } from "../repositoryInterface/ISummaryRepository";
import { appointmentModel } from "../../../user/infrastructure/models/appointmentModel";


export class SummaryRepository implements ISummaryRepository{

    async getSummary(lawyerId: Types.ObjectId): Promise<SummaryDto | null> {
        const result=await appointmentModel.aggregate([{
            $match:{
                lawyerId:lawyerId
            }
        },
        {
            $facet:{
                totalConsultations:[{$group:{_id:null,count:{$sum:1}}}],
                pendingConsultations:[{$match:{appointmentStatus:"Pending"}},{$group:{_id:null,count:{$sum:1}}}],
                upcomingConsultations:[{$match:{appointmentStatus:"Booked"}},{$group:{_id:null,count:{$sum:1}}}],
                completedConsultations:[{$match:{appointmentStatus:"Completed"}},{$group:{_id:null,count:{$sum:1}}}],
                CancelledConsultations:[{$match:{appointmentStatus:"Cancelled"}},{$group:{_id:null,count:{$sum:1}}}],
                rejectedConsultations:[{$match:{appointmentStatus:"Rejected"}},{$group:{_id:null,count:{$sum:1}}}],
                totalRevenue:[{$match:{appointmentStatus:"Booked"}},{$group:{_id:null,revenue:{$sum:"$fee"}}}],
                graphData:[{$match:{appointmentStatus:"Booked"}},{$group:{_id:{year: { $year: { $dateFromString: { dateString: "$date" } } }, month: { $month: { $dateFromString: { dateString: "$date" } } }},count:{$sum:1},revenue:{$sum:"$fee"}}}]
            }
        }
    ])
        return result[0]
    }
}