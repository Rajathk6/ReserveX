import { Router } from 'express';
import { authenticationHandler, authorizationHandler } from '../../../middleware/AuthHandler.js';
import { EventController } from '../controllers/event.controller.js';

const eventRouter = Router();
const eventController = new EventController();

eventRouter.post(
  '/',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  eventController.create.bind(eventController),
);

eventRouter.get('/', eventController.getAll.bind(eventController));

eventRouter.get('/:id', eventController.get.bind(eventController));

eventRouter.patch(
  '/:id',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  eventController.update.bind(eventController),
);

eventRouter.delete(
  '/:id',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  eventController.delete.bind(eventController),
);

export default eventRouter;
