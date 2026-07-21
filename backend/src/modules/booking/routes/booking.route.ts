import { Router } from 'express';
import { BookingController } from '../controllers/bookingController.js';
import { authenticationHandler, authorizationHandler } from '../../../middleware/AuthHandler.js';
import { validationHandler } from '../../../middleware/ValidationHandler.js';
import { bookingIdParamSchema, createBookingSchema } from '../validators/booking.validator.js';

const bookingRouter = Router({ mergeParams: true });
const bookingController = new BookingController();

bookingRouter.post(
  '/:eventId/bookings',
  authenticationHandler,
  authorizationHandler('USER'),
  validationHandler(createBookingSchema, 'body'),
  bookingController.createBooking.bind(bookingController),
);

bookingRouter.get(
  '/',
  authenticationHandler,
  authorizationHandler('USER'),
  bookingController.getUserBookings.bind(bookingController),
);

bookingRouter.get(
  '/:bookingId',
  authenticationHandler,
  authorizationHandler('USER'),
  validationHandler(bookingIdParamSchema, 'params'),
  bookingController.getBooking.bind(bookingController),
);

bookingRouter.delete(
  '/:bookingId',
  authenticationHandler,
  authorizationHandler('USER'),
  validationHandler(bookingIdParamSchema, 'params'),
  bookingController.cancelBooking.bind(bookingController),
);

export default bookingRouter;
