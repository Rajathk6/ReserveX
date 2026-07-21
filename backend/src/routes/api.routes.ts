import { Router } from 'express';

import coreRouter from '../modules/core/routes/core.routes.js';
import authRouter from '../modules/authentication/routes/auth.routes.js';
import eventRouter from '../modules/event/routes/event.route.js';
import eventstatusRouter from '../modules/event/routes/eventStatus.js';
import venueRouter from '../modules/venue/routes/venue.route.js';
import seatRouter from '../modules/seat/routes/seat.route.js';
import bookingRouter from '../modules/booking/routes/booking.route.js';

const route = Router();

route.use('/', coreRouter);
route.use('/auth', authRouter);
route.use('/events', eventRouter, eventstatusRouter, bookingRouter);
route.use('/venues', venueRouter, seatRouter);
route.use('/bookings', bookingRouter);
route.use('/users/me/bookings', bookingRouter);

export default route;
