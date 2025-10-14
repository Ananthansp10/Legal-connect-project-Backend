"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSigninRepository = void 0;
const userSignupModel_1 = require("../models/userSignupModel");
const baseRepository_1 = require("./baseRepository");
class UserSigninRepository extends baseRepository_1.BaseRepository {
  constructor() {
    super(userSignupModel_1.userModel);
  }
}
exports.UserSigninRepository = UserSigninRepository;
