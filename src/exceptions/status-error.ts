export class HttpException extends Error {
  message: string;
  statusCode: number;
  errors: any;

  constructor(message: string, statusCode: number, error: any) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errors = error;
  }
}

export class StatusError extends HttpException {
  constructor(message: string, statusCode: number, error?: any) {
    super(message, statusCode, error);
  }
}
