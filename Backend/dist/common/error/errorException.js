"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppException = void 0;
const AppStatusCode_1 = require("../statusCode/AppStatusCode");
class AppException extends Error {
  constructor(
    message,
    statusCode = AppStatusCode_1.AppStatusCode.BAD_REQUEST_CODE,
  ) {
    super(message);
    this.name = "AppException";
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
exports.AppException = AppException;
