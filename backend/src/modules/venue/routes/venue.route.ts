import { Router } from 'express';

import { VenueController } from '../controllers/venue.controller.js';
import { authenticationHandler, authorizationHandler } from '../../../middleware/AuthHandler.js';
import { validationHandler } from '../../../middleware/ValidationHandler.js';
import { createVenueSchema, venueIdParamSchema } from '../validators/venue.validator.js';

const venueRouter = Router();
const venueController = new VenueController();

venueRouter.get(
  '/',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  venueController.getAll.bind(venueController),
);

venueRouter.get(
  '/:id',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  validationHandler(venueIdParamSchema, 'params'),
  venueController.get.bind(venueController),
);

venueRouter.post(
  '/',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  validationHandler(createVenueSchema, 'body'),
  venueController.create.bind(venueController),
);

venueRouter.patch(
  '/:id',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  validationHandler(venueIdParamSchema, 'params'),
  venueController.update.bind(venueController),
);

venueRouter.delete(
  '/:id',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  validationHandler(venueIdParamSchema, 'params'),
  venueController.delete.bind(venueController),
);

export default venueRouter;
