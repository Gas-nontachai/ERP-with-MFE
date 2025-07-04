export class NotFoundError extends Error {
  statusCode = 404;

  constructor(message: string = "Resource not found") {
    super(message);
    this.name = "NotFoundError";

    // กรณีใช้กับ TypeScript และ stack trace
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
