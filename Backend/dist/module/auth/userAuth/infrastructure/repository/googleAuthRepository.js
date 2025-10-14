"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthRepository = void 0;
const userSignupModel_1 = require("../models/userSignupModel");
const baseRepository_1 = require("./baseRepository");
class GoogleAuthRepository extends baseRepository_1.BaseRepository {
  constructor() {
    super(userSignupModel_1.userModel);
  }
}
exports.GoogleAuthRepository = GoogleAuthRepository;
