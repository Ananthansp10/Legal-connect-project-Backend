import { IEditLawyerProfileRepository } from "../../infrastructure/repositoryInterface/IEditLawyerProfileRepository";
import {
  ILawyerEditProfileRequest,
  ILawyerEditProfileResponse,
} from "../mapper/lawyerEditProfileMapper";
import { IEditLawyerProfileUseCase } from "../use-case-interface/IEditLawyerProfileUseCase";
import { EditLawyerProfileMapper } from "../mapper/lawyerEditProfileMapper";

export class LawyerEditProfileUseCase implements IEditLawyerProfileUseCase {
  constructor(private _editLawyerProfileRepo: IEditLawyerProfileRepository) {}

  async execute(
    data: ILawyerEditProfileRequest,
    imageUrl: string,
  ): Promise<void> {
    const editedData: ILawyerEditProfileResponse =
      await EditLawyerProfileMapper.toResponse(data, imageUrl);

    await this._editLawyerProfileRepo.editLawyerProfile(
      data.lawyerId,
      editedData,
    );
  }
}
