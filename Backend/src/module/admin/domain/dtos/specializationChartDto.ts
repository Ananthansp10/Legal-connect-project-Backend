export interface ISpecializationData {
  _id?: string;
  count?: number;
  average?: number;
  specializationName?: string;
}

interface ITotalLawyers {
  totalLawyers: number;
}

export interface ISpecializationChartDto {
  totalLawyers: ITotalLawyers[];
  specializations: ISpecializationData[];
}
