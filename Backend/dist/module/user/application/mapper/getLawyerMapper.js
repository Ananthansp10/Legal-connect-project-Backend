"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLawyerMapper = void 0;
class GetLawyerMapper {
  static toResponse(data) {
    return data.map((lawyer) => ({
      lawyerId: lawyer.lawyerId,
      name: lawyer.personalInfo.name,
      specialization: lawyer.proffessionalInfo.practiceAreas,
      experience: lawyer.proffessionalInfo.experience,
      country: lawyer.personalInfo.address.country,
      state: lawyer.personalInfo.address.state,
      profileImage: lawyer.personalInfo.profileImage,
    }));
  }
}
exports.GetLawyerMapper = GetLawyerMapper;
