import { Types } from "mongoose";
import { AppStatus } from "../../../../common/status/appStatus";
import { lawyerModel } from "../../../auth/lawyerAuth/infrastructure/models/lawyerModel";
import { lawyerProfileModel } from "../../../lawyer/infrastructure/models/lawyerProfileModel";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerRepository } from "../repositoryInterface/ILawyerRepository";
import { BaseRepository } from "./baseRepository";
import { ILawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";

export class LawyerRepository
  extends BaseRepository<ILawyerSignup>
  implements ILawyerRepository
{
  constructor() {
    super(lawyerModel);
  }

  async updateLawyerStatus(lawyerId: string, status: string): Promise<void> {
    if (status == AppStatus.UNBLOCK) {
      await lawyerModel.findByIdAndUpdate(lawyerId, {
        $set: { isBlock: false },
      });
    } else {
      await lawyerModel.findByIdAndUpdate(lawyerId, {
        $set: { isBlock: true },
      });
    }
  }

  async searchLawyer(name: string): Promise<ILawyerSignup[] | null> {
    return await lawyerModel.find({ name: name });
  }

  async filterLawyer(status: string): Promise<ILawyerSignup[] | null> {
    return await lawyerModel.find(
      status == "unblock"
        ? { isBlock: false }
        : status == "block"
          ? { isBlock: true }
          : {},
    );
  }

  async getLawyerDetails(
    lawyerId: Types.ObjectId,
  ): Promise<ILawyerProfileEntity | null> {
    return await lawyerProfileModel.findOne({ lawyerId: lawyerId });
  }
}
