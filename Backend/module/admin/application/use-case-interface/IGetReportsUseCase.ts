import { ReportsDto } from "../../domain/dtos/reportsDto";


export interface IGetReportsUseCase{
    execute():Promise<ReportsDto>
}