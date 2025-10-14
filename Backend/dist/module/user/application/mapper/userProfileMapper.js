"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileMapper = void 0;
class UserProfileMapper {
  static toRequest(data, imageUrl) {
    return {
      userId: data.userId,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      DOB: data.DOB,
      proffession: data.proffession,
      company: data.company,
      profileImage: imageUrl,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
      },
    };
  }
}
exports.UserProfileMapper = UserProfileMapper;
