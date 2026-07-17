import { Router } from 'express';
import { authenticationHandler, authorizationHandler } from '../../../middleware/AuthHandler.js';
import { EventStatuscontroller } from '../controllers/eventStatus.controller.js';

const eventstatusRouter = Router();

const statusController = new EventStatuscontroller();

eventstatusRouter.patch(
  '/:id/publish',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  statusController.publish.bind(statusController),
);

eventstatusRouter.patch(
  '/:id/complete',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  statusController.complete.bind(statusController),
);

eventstatusRouter.patch(
  '/:id/cancel',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  statusController.cancel.bind(statusController),
);

export default eventstatusRouter;
