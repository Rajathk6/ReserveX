import { Request, Response } from 'express';

import { successResponse } from '../../../utils/apiResponse.js';
import { AuthService } from '../services/auth.service.js';
import { LoginDTO, RegisterDTO } from '../validators/auth.validator.js';
import { cookieOptions } from '../../../config/cookie.js';

export class AuthController {
  constructor(private readonly authService = new AuthService()) {}

  // register user
  async register(req: Request, res: Response) {
    const body = req.body as RegisterDTO;
    const user = await this.authService.register(body);

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
    const body = req.body as LoginDTO;

    const user = await this.authService.login(body);

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

  // logout user
  async logout(req: Request, res: Response) {
    const token = req.cookies.refreshToken;

    if (token) await this.authService.logout(token);

    res.clearCookie('refreshToken', cookieOptions);

    return successResponse(res, 'user logged out successfully', {});
  }

  // user profile
  async profile(req: Request, res: Response) {
    return successResponse(res, 'user profile', req.user);
  }

  // admin
  async admin(req: Request, res: Response) {
    return successResponse(res, 'Welcome admin', req.user);
  }
}
