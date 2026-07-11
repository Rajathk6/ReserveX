import { successResponse } from '../../../utils/apiResponse.js';
import { AuthService } from '../services/auth.service.js';
import { Request, Response } from 'express';
import { registerSchema } from '../validators/auth.validator.js';
import { AppError } from '../../../errors/appErrors.js';

export class AuthController {
  constructor(private readonly authService = new AuthService()) {}
  registerValidator(req: Request, _res: Response) {
    return req.body;
  }

  async register(req: Request, res: Response) {
    const validatedData = registerSchema.safeParse(req.body);

    if (!validatedData.success) {
      throw new AppError(400, validatedData.error.issues[0].message);
    }

    const user = await this.authService.register(req.body);

    return successResponse(
      res,
      'User registered successfully',
      {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      201,
    );
  }
}
