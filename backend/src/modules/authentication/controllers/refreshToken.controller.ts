import { Request, Response } from 'express';
import { RefreshTokenService } from '../services/refreshToken.service.js';
import { successResponse } from '../../../utils/apiResponse.js';
export class RefreshTokenRotationController {
  constructor(private readonly refreshTokenService = new RefreshTokenService()) {}

  async refresh(req: Request, res: Response) {
    const refreshToken = req.body.refreshToken;
    const newRefreshToken = await this.refreshTokenService.refreshTokenRotation(refreshToken);
    return successResponse(res, 'Refresh token generated successfully', newRefreshToken);
  }
}
