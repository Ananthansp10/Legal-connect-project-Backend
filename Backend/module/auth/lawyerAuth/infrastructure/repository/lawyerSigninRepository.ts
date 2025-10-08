import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerSigninRepository } from "../repositoryInterface/ILawyerSigninRepository";
import { lawyerModel } from "../models/lawyerModel";
import { BaseRepository } from "./baseRepository";

export class LawyerSigninRepository
  extends BaseRepository<ILawyerSignup>
  implements ILawyerSigninRepository
{
  constructor() {
    super(lawyerModel);
  }
}
