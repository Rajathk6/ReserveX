import { Router } from 'express';

import { authenticationHandler, authorizationHandler } from '../../../middleware/AuthHandler.js';
import { EventStatuscontroller } from '../controllers/eventStatus.controller.js';
import { validationHandler } from '../../../middleware/ValidationHandler.js';
import { eventIdParamSchema } from '../validators/event.validator.js';

const eventstatusRouter = Router();

const statusController = new EventStatuscontroller();

eventstatusRouter.patch(
  '/:id/publish',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  validationHandler(eventIdParamSchema, 'params'),
  statusController.publish.bind(statusController),
);

eventstatusRouter.patch(
  '/:id/complete',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  validationHandler(eventIdParamSchema, 'params'),
  statusController.complete.bind(statusController),
);

eventstatusRouter.patch(
  '/:id/cancel',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  validationHandler(eventIdParamSchema, 'params'),
  statusController.cancel.bind(statusController),
);

export default eventstatusRouter;
