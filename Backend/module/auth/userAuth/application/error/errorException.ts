

export class AppException extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = 'AppException';
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
