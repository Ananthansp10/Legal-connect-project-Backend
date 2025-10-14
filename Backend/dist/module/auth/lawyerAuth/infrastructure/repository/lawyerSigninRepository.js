"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LawyerSigninRepository = void 0;
const lawyerModel_1 = require("../models/lawyerModel");
const baseRepository_1 = require("./baseRepository");
class LawyerSigninRepository extends baseRepository_1.BaseRepository {
  constructor() {
    super(lawyerModel_1.lawyerModel);
  }
}
exports.LawyerSigninRepository = LawyerSigninRepository;
