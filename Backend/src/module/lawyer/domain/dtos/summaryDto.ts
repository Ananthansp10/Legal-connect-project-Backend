interface IGraphData {
  id: string;
  count: number;
  revenue: number;
}

export interface ISummaryDto {
  id: string;
  totalConsultations: number;
  totalRevenue: number;
  cancelledConsultations: number;
  rejectedConsultations: number;
  upcomingConsultations: number;
  pendingConsultations: number;
  completedConsultations: number;
  graphData: IGraphData;
}
