import { ILawyerSignup } from "../../domain/entity/lawyerEntity";

export class LawyerSigninMapper {
  static toResponse(
    data: ILawyerSignup,
    accessToken: string,
    refreshToken: string,
  ) {
    return {
      lawyerDetails: {
        _id: data._id,
        name: data.name,
        email: data.email,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
