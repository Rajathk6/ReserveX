import { Request, Response } from 'express';
import { EventService } from '../services/event.service.js';
import { successResponse } from '../../../utils/apiResponse.js';
import { eventIdParamSchema } from '../validators/event.validator.js';

export class EventController {
  constructor(private readonly eventService = new EventService()) {}

  async create(req: Request, res: Response) {
    const event = await this.eventService.create(req.body, req.user!.id);
    return (successResponse(res, 'Event created successfully', event), 201);
  }

  async getAll(req: Request, res: Response) {
    const events = await this.eventService.getAll();

    return successResponse(res, 'Events fetched successfully', events);
  }

  async get(req: Request, res: Response) {
    const params = eventIdParamSchema.parse(req.params);
    const events = await this.eventService.get(params.id);
    return successResponse(res, 'Event fetched successfully', events);
  }

  async update(req: Request, res: Response) {
    const params = eventIdParamSchema.parse(req.params);
    const event = await this.eventService.update(params.id, req.body);
    return successResponse(res, 'Event updated successfully', event);
  }

  async delete(req: Request, res: Response) {
    const params = eventIdParamSchema.parse(req.params);
    const event = await this.eventService.delete(params.id);
    return successResponse(res, 'Event deleted successfully', event);
  }
}
