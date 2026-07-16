import { Router } from 'express';
import { authenticationHandler, authorizationHandler } from '../../../middleware/AuthHandler.js';
import { EventController } from '../controllers/event.controller.js';
import { validationHandler } from '../../../middleware/ValidationHandler.js';
import {
  createEventSchema,
  eventIdParamSchema,
  paginationSchema,
} from '../validators/event.validator.js';

const eventRouter = Router();
const eventController = new EventController();

eventRouter.post(
  '/',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  validationHandler(createEventSchema, 'body'),
  eventController.create.bind(eventController),
);

eventRouter.get(
  '/',
  validationHandler(paginationSchema, 'query'),
  eventController.getAll.bind(eventController),
);

eventRouter.get(
  '/:id',
  validationHandler(eventIdParamSchema, 'params'),
  eventController.get.bind(eventController),
);

eventRouter.patch(
  '/:id',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  validationHandler(eventIdParamSchema, 'params'),
  eventController.update.bind(eventController),
);

eventRouter.delete(
  '/:id',
  authenticationHandler,
  authorizationHandler('ADMIN'),
  validationHandler(eventIdParamSchema, 'params'),
  eventController.delete.bind(eventController),
);

export default eventRouter;
