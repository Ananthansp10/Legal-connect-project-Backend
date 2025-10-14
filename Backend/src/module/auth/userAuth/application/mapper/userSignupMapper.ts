import {
  IUserSignupRequestDto,
  IUserSignupResponseDto,
} from "../../domain/dto/userSignupDto";
import { IUserSignup } from "../../domain/userRegisterEntity";

export class UserSignupMapper {
  static toRequest(data: IUserSignup): IUserSignupRequestDto {
    return {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber!,
      password: data.password!,
      isActive: false,
      isBlock: false,
    };
  }

  static toResponse(data: IUserSignup): IUserSignupResponseDto {
    return {
      _id: data._id!,
      name: data.name,
      email: data.email,
    };
  }
}
