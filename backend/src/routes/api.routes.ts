import { Router } from 'express';

import coreRouter from '../modules/core/routes/core.routes.js';
import authRouter from '../modules/authentication/routes/auth.routes.js';
import eventRouter from '../modules/event/routes/event.route.js';
import eventstatusRouter from '../modules/event/routes/eventStatus.js';

const route = Router();

route.use('/', coreRouter);
route.use('/auth', authRouter);
route.use('/events', eventRouter, eventstatusRouter);

export default route;
