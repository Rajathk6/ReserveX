import { Router } from 'express';
import CoreRouter from '../modules/core/routes/core.routes.js';

const route = Router();

route.use('/', CoreRouter);

export default route;
