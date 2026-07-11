import { Router } from 'express';

import CoreRouter from '../modules/core/routes/core.routes.js';
import authRouter from '../modules/authentication/routes/auth.routes.js';

const route = Router();

route.use('/', CoreRouter);
route.use('/auth', authRouter);

export default route;
