import { AppStatusCode } from "../statusCode/AppStatusCode";

export class AppException extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = AppStatusCode.BAD_REQUEST_CODE) {
    super(message);
    this.name = "AppException";
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
