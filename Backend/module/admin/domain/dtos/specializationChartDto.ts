export interface SpecializationData {
  _id?: string;
  count?: number;
  average?: number;
  specializationName?: string;
}

interface TotalLawyers {
  totalLawyers: number;
}

export interface SpecializationChartDto {
  totalLawyers: TotalLawyers[];
  specializations: SpecializationData[];
}
