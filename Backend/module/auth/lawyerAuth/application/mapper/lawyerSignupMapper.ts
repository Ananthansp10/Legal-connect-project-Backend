import {
  LawyerSignupRequestDto,
  LawyerSignupResponseDto,
} from "../../domain/dto/lawyerSignupDto";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";

export class LawyerSignupMapper {
  static toRequest(data: ILawyerSignup): LawyerSignupRequestDto {
    return {
      name: data.name,
      email: data.email,
      password: data.password,
      specialization: data.specialization,
      experience: data.experience,
      barCouncilNumber: data.barCouncilNumber,
      documents: data.documents,
      isBlock: false,
      verified: false,
      createdAt: data.createdAt!,
    };
  }

  static toResponse(data: ILawyerSignup): LawyerSignupResponseDto {
    return {
      id: data._id!,
      name: data.name,
      email: data.email,
    };
  }
}
