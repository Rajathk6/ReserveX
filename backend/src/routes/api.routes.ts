import { Router } from 'express';

import coreRouter from '../modules/core/routes/core.routes.js';
import authRouter from '../modules/authentication/routes/auth.routes.js';
import eventRouter from '../modules/event/routes/event.route.js';
import eventstatusRouter from '../modules/event/routes/eventStatus.js';
import venueRouter from '../modules/venue/routes/venue.route.js';
import seatRouter from '../modules/seat/routes/seat.route.js';

const route = Router();

route.use('/', coreRouter);
route.use('/auth', authRouter);
route.use('/events', eventRouter, eventstatusRouter);
route.use('/venues', venueRouter, seatRouter);

export default route;
