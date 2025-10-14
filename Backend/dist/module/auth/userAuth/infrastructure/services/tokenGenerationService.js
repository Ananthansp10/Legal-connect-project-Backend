"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGenerationService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenGenerationService {
  constructor() {
    this._accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
    this._refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
  }
  generateAccessToken(payload) {
    let accessToken = jsonwebtoken_1.default.sign(
      payload,
      this._accessTokenSecret,
      {
        expiresIn: "30m",
      },
    );
    return accessToken;
  }
  generateRefreshToken(payload) {
    let refreshToken = jsonwebtoken_1.default.sign(
      payload,
      this._refreshTokenSecret,
      {
        expiresIn: "7d",
      },
    );
    return refreshToken;
  }
}
exports.TokenGenerationService = TokenGenerationService;
