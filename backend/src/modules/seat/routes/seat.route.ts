import { Router } from 'express';

import { authenticationHandler, authorizationHandler } from '../../../middleware/AuthHandler.js';
import { validationHandler } from '../../../middleware/ValidationHandler.js';
import { seatQuerySchema, seatIdParamSchema } from '../validators/seat.validator.js';
import { SeatController } from '../controllers/seat.controller.js';

const seatRouter = Router();
const seatController = new SeatController();

seatRouter.get(
  '/:venueId/seats',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  validationHandler(seatQuerySchema, 'query'),
  seatController.getByVenue.bind(seatController),
);

seatRouter.get(
  '/:venueId/seats/:seatId',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  validationHandler(seatIdParamSchema, 'params'),
  seatController.getById.bind(seatController),
);

export default seatRouter;
