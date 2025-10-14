import { ILawyerResponse } from "../../domain/dtos/lawyerDto";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";

export class LawyerMapper {
  static async toResponse(data: ILawyerSignup[]): Promise<ILawyerResponse[]> {
    return data.map((lawyer) => ({
      _id: lawyer._id!,
      name: lawyer.name,
      email: lawyer.email,
      status: lawyer.isBlock,
      createdAt: lawyer.createdAt,
    }));
  }
}
