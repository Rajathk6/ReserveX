import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { RefreshTokenRotationController } from '../controllers/refreshToken.controller.js';
import { authenticationHandler, authorizationHandler } from '../../../middleware/AuthHandler.js';
import { validationHandler } from '../../../middleware/ValidationHandler.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';
import { UserRole } from '@prisma/client';

const authRouter = Router();
const authController = new AuthController();
const refreshTokenRotationController = new RefreshTokenRotationController();

authRouter.post(
  '/register',
  validationHandler(registerSchema, 'body'),
  authController.register.bind(authController),
);

authRouter.post(
  '/login',
  validationHandler(loginSchema, 'body'),
  authController.login.bind(authController),
);

authRouter.post(
  '/refresh',
  refreshTokenRotationController.refresh.bind(refreshTokenRotationController),
);

authRouter.post('/logout', authController.logout.bind(authController));

authRouter.get('/profile', authenticationHandler, authController.profile.bind(authController));

authRouter.get(
  '/admin',
  authenticationHandler,
  authorizationHandler(UserRole.ADMIN),
  validationHandler(loginSchema, 'body'),
  authController.admin.bind(authController),
);

export default authRouter;
