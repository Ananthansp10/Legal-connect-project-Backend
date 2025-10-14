"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAccountStatusRepository = void 0;
const userSignupModel_1 = require("../models/userSignupModel");
const baseRepository_1 = require("./baseRepository");
class CheckAccountStatusRepository extends baseRepository_1.BaseRepository {
  constructor() {
    super(userSignupModel_1.userModel);
  }
}
exports.CheckAccountStatusRepository = CheckAccountStatusRepository;
