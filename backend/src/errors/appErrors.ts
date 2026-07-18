export interface ValidationErrorDetail {
  field: string;
  message: string;
}

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly errors?: ValidationErrorDetail[],
  ) {
    super(message);
    this.name = 'AppError';
  }
}
