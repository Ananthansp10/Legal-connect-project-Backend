"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LawyerAddProfileRepository = void 0;
const lawyerProfileModel_1 = require("../models/lawyerProfileModel");
const baseRepository_1 = require("./baseRepository");
class LawyerAddProfileRepository extends baseRepository_1.BaseRepository {
  constructor() {
    super(lawyerProfileModel_1.lawyerProfileModel);
  }
}
exports.LawyerAddProfileRepository = LawyerAddProfileRepository;
