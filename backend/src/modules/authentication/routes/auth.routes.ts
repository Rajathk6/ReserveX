import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { RefreshTokenRotationController } from '../controllers/refreshToken.controller.js';
import { authHandler } from '../../../middleware/AuthHandler.js';

const authRouter = Router();
const authController = new AuthController();
const refreshTokenRotationController = new RefreshTokenRotationController();

authRouter.post('/register', authController.register.bind(authController));
authRouter.post('/login', authController.login.bind(authController));
authRouter.post(
  '/refresh',
  refreshTokenRotationController.refresh.bind(refreshTokenRotationController),
);
authRouter.post('/logout', authController.logout.bind(authController));
authRouter.get('/profile', authHandler, authController.profile.bind(authController));

export default authRouter;
