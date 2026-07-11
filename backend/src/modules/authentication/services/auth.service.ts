import bcrypt from 'bcrypt';
import { UserRepository } from '../../user/repository/user.respository.js';
import { LoginDTO, RegisterDTO } from '../validators/auth.validator.js';
import { AppError } from '../../../errors/appErrors.js';
import { JwtService } from './jwt.service.js';

export class AuthService {
  constructor(
    private readonly userRepository = new UserRepository(),
    private readonly jwtService = new JwtService(),
  ) {}

  // register user
  async register(data: RegisterDTO) {
    const exists = await this.userRepository.exists(data.email);

    if (exists) {
      throw new AppError(409, 'user already exists');
    }

    const hashPassword = await this.hashPassword(data.password);

    const user = await this.userRepository.create({
      fullName: data.fullName,
      email: data.email,
      passwordHash: hashPassword,
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

    const isValidPassword = await this.verifyPassword(data.password, user.passwordHash);

    if (!isValidPassword) {
      throw new AppError(401, 'invalid credentials');
    }

    const accessToken = this.jwtService.generateAccessToken(user.id, user.role);

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      accessToken,
    };
  }

  // helper functions
  async hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  async verifyPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
