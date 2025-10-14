"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LawyerSignupMapper = void 0;
class LawyerSignupMapper {
  static toRequest(data) {
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
      createdAt: data.createdAt,
    };
  }
  static toResponse(data) {
    return {
      id: data._id,
      name: data.name,
      email: data.email,
    };
  }
}
exports.LawyerSignupMapper = LawyerSignupMapper;
