import { IAppointmentsData } from "./IGetAppointmentsUseCase";

export interface ISearchAppointmentUseCase {
  execute(name: string): Promise<IAppointmentsData[] | null>;
}
