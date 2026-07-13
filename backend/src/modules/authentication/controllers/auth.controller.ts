import { successResponse } from '../../../utils/apiResponse.js';
import { AuthService } from '../services/auth.service.js';
import { Request, Response } from 'express';
import { loginSchema, registerSchema } from '../validators/auth.validator.js';
import { AppError } from '../../../errors/appErrors.js';
import { cookieOptions } from '../../../config/cookie.js';

export class AuthController {
  constructor(private readonly authService = new AuthService()) {}

  // register user
  async register(req: Request, res: Response) {
    const validatedData = registerSchema.safeParse(req.body);

    if (!validatedData.success) {
      throw new AppError(400, validatedData.error.issues[0].message);
    }

    const user = await this.authService.register(validatedData.data);

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

  //login user

  async login(req: Request, res: Response) {
    const validatedData = loginSchema.safeParse(req.body);

    if (!validatedData.success) {
      throw new AppError(400, validatedData.error.issues[0].message);
    }

    const user = await this.authService.login(validatedData.data);

    res.cookie('refreshToken', user.refreshToken, cookieOptions);

    return successResponse(res, 'user logged in succesfully', {
      accessToken: user.accessToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  }

  async logout(req: Request, res: Response) {
    const token = req.cookies.refreshToken;

    if (token) await this.authService.logout(token);

    res.clearCookie('refreshToken', cookieOptions);

    return successResponse(res, 'user logged out successfully', {});
  }

  async profile(req: Request, res: Response) {
    return successResponse(res, 'user profile', req.user);
  }
}
