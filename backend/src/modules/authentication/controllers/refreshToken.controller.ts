import { Request, Response } from 'express';
import { RefreshTokenService } from '../services/refreshToken.service.js';
import { successResponse } from '../../../utils/apiResponse.js';
import { cookieOptions } from '../../../config/cookie.js';
import { AppError } from '../../../errors/appErrors.js';
export class RefreshTokenRotationController {
  constructor(private readonly refreshTokenService = new RefreshTokenService()) {}

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError(401, 'you are not logged in, please login');
    }
    const newRefreshToken = await this.refreshTokenService.refreshTokenRotation(refreshToken);
    res.cookie('refreshToken', newRefreshToken.refreshToken, cookieOptions);

    return successResponse(res, 'Refresh token generated successfully', {
      accessToken: newRefreshToken.accessToken,
    });
  }
}
