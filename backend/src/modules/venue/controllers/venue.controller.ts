import { Request, Response } from 'express';

import { VenueService } from '../services/venue.service.js';
import { successResponse } from '../../../utils/apiResponse.js';
import { VenueIdParamDTO } from '../types/venue.type.js';

export class VenueController {
  constructor(private readonly venueService = new VenueService()) {}
  async getAll(_req: Request, res: Response) {
    const venues = await this.venueService.getAll();
    return successResponse(res, 'Venues fetched successfully', venues);
  }

  async get(req: Request<VenueIdParamDTO>, res: Response) {
    const venue = await this.venueService.get(req.params.id);
    return successResponse(res, 'Venue fetched successfully', venue);
  }

  async create(req: Request, res: Response) {
    const venue = await this.venueService.create(req.body);
    return successResponse(res, 'Venue created successfully', venue);
  }

  async update(req: Request<VenueIdParamDTO>, res: Response) {
    const venue = await this.venueService.update(req.params.id, req.body);
    return successResponse(res, 'Venue updated successfully', venue);
  }

  async delete(req: Request<VenueIdParamDTO>, res: Response) {
    const venue = await this.venueService.delete(req.params.id);
    return successResponse(res, 'Venue deleted successfully', venue);
  }
}
