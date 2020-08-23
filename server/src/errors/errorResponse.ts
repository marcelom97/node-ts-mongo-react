export class ErrorResponse extends Error {
  statusCode = 200;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
