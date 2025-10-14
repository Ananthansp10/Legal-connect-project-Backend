"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileRepository = void 0;
const userProfileModel_1 = require("../models/userProfileModel");
const baseRepository_1 = require("./baseRepository");
class UserProfileRepository extends baseRepository_1.BaseRepository {
  constructor() {
    super(userProfileModel_1.userProfileModel);
  }
}
exports.UserProfileRepository = UserProfileRepository;
