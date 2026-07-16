import { Request, Response } from 'express';

import { EventService } from '../services/event.service.js';
import { successResponse } from '../../../utils/apiResponse.js';
import { EventFilterDTO, EventIdParamDTO } from '../types/event.type.js';

export class EventController {
  constructor(private readonly eventService = new EventService()) {}

  async create(req: Request, res: Response) {
    const event = await this.eventService.create(req.body, req.user!.id);
    return (successResponse(res, 'Event created successfully', event), 201);
  }

  async getAll(req: Request, res: Response) {
    const dto = req.query as unknown as EventFilterDTO;
    const events = await this.eventService.getAll(dto);
    return successResponse(res, 'Events fetched successfully', events);
  }

  async get(req: Request<EventIdParamDTO>, res: Response) {
    const events = await this.eventService.get(req.params.id);
    return successResponse(res, 'Event fetched successfully', events);
  }

  async update(req: Request<EventIdParamDTO>, res: Response) {
    const event = await this.eventService.update(req.params.id, req.body);
    return successResponse(res, 'Event updated successfully', event);
  }

  async delete(req: Request<EventIdParamDTO>, res: Response) {
    const event = await this.eventService.delete(req.params.id);
    return successResponse(res, 'Event deleted successfully', event);
  }
}
