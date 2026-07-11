import bcrypt from 'bcrypt';
import { UserRepository } from '../../user/repository/user.respository.js';
import { RegisterDTO } from '../validators/auth.validator.js';
import { AppError } from '../../../errors/appErrors.js';

export class AuthService {
  constructor(private readonly userRepository = new UserRepository()) {}

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
  async hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  async verifyPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
