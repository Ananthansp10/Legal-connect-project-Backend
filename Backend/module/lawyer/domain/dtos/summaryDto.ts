
interface GraphData{
    id:string;
    count:number;
    revenue:number;
}

export interface SummaryDto{
    id:string;
    totalConsultations:number;
    totalRevenue:number;
    cancelledConsultations:number;
    rejectedConsultations:number;
    upcomingConsultations:number;
    pendingConsultations:number;
    completedConsultations:number;
    graphData:GraphData
}