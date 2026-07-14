import { Router } from 'express';

import coreRouter from '../modules/core/routes/core.routes.js';
import authRouter from '../modules/authentication/routes/auth.routes.js';
import eventRouter from '../modules/event/routes/event.route.js';

const route = Router();

route.use('/', coreRouter);
route.use('/auth', authRouter);
route.use('/events', eventRouter);

export default route;
