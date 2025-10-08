import { Types } from "mongoose";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { IBaseRepository } from "./IBaseRepository";
import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";

export interface ILawyerRepository extends IBaseRepository<ILawyerSignup> {
  updateLawyerStatus(lawyerId: string, status: string): Promise<void>;
  searchLawyer(name: string): Promise<ILawyerSignup[] | null>;
  filterLawyer(status: string): Promise<ILawyerSignup[] | null>;
  getLawyerDetails(
    lawyerId: Types.ObjectId,
  ): Promise<LawyerProfileEntity | null>;
}
