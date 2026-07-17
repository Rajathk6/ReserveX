import { Request, Response } from 'express';

import { EventStatusService } from '../services/eventStatus.service.js';
import { EventIdParamDTO } from '../types/event.type.js';
import { successResponse } from '../../../utils/apiResponse.js';

export class EventStatuscontroller {
  constructor(private readonly eventStatusService = new EventStatusService()) {}

  async publish(req: Request<EventIdParamDTO>, res: Response) {
    const event = await this.eventStatusService.publish(req.params.id);
    return successResponse(res, 'Event Published', event);
  }

  async complete(req: Request<EventIdParamDTO>, res: Response) {
    const event = await this.eventStatusService.complete(req.params.id);
    return successResponse(res, 'Event completed', event);
  }

  async cancel(req: Request<EventIdParamDTO>, res: Response) {
    const event = await this.eventStatusService.cancel(req.params.id);
    return successResponse(res, 'Event cancelled', event);
  }
}
