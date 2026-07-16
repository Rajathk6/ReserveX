import ms from 'ms';

import { UserRepository } from '../../user/repository/user.respository.js';
import { LoginDTO, RegisterDTO } from '../types/auth.type.js';
import { AppError } from '../../../errors/appErrors.js';
import { generateAccessToken } from '../utils/jwt.js';
import { RefreshTokenRepository } from '../repositories/refreshToken.repositor.js';
import env from '../../../config/env.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { generateRefreshToken, generateRefreshTokenHash } from '../utils/refreshToken.js';

export class AuthService {
  constructor(
    private readonly userRepository = new UserRepository(),
    private readonly refreshTokenRepository = new RefreshTokenRepository(),
  ) {}

  // register user
  async register(data: RegisterDTO) {
    const exists = await this.userRepository.exists(data.email);
    if (exists) {
      throw new AppError(409, 'user already exists');
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await this.userRepository.create({
      fullName: data.fullName,
      email: data.email,
      passwordHash: hashedPassword,
    });

    return user;
  }

  // login user
  async login(data: LoginDTO) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError(401, 'user not found, please register');
    }

    if (!user.isActive) {
      throw new AppError(401, 'Account has been deactivated');
    }

    const isValidPassword = await verifyPassword(data.password, user.passwordHash);
    if (!isValidPassword) {
      throw new AppError(401, 'invalid credentials');
    }

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken();
    const refreshTokenHash = generateRefreshTokenHash(refreshToken);

    await this.refreshTokenRepository.create({
      tokenHash: refreshTokenHash,
      userId: user.id,
      expiresAt: new Date(Date.now() + ms(env.JWT_REFRESH_EXPIRES_IN as ms.StringValue)),
    });

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      accessToken,
      refreshToken,
    };
  }

  // logout user
  async logout(token: string) {
    const tokenHash = generateRefreshTokenHash(token);
    const validToken = await this.refreshTokenRepository.findByTokenHash(tokenHash);

    if (!validToken) {
      return;
    }

    await this.refreshTokenRepository.deleteByRefreshtoken(validToken.tokenHash);
  }
}
