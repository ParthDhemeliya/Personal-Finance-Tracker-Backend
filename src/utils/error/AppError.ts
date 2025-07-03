export class AppError extends Error {
  statusCode: number;
  details?: string;

  constructor(message: string, statusCode = 500, details?: string) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
