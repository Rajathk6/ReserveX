import { Request, Response } from 'express';
import { SeatService } from '../services/seat.service.js';
import { SeatFilterDTO, SeatIdParamDTO } from '../types/seat.type.js';
import { successResponse } from '../../../utils/apiResponse.js';

export class SeatController {
  constructor(private readonly seatService = new SeatService()) {}

  async getByVenue(req: Request<SeatIdParamDTO>, res: Response) {
    const venueId = req.params.venueId;
    const dto = req.query as unknown as SeatFilterDTO;
    const seats = await this.seatService.getByVenue(dto, venueId);
    return successResponse(res, 'Seats fetched successfully', seats);
  }

  async getById(req: Request<SeatIdParamDTO>, res: Response) {
    const seat = await this.seatService.getById(req.params.venueId, req.params.seatId);
    return successResponse(res, 'Seat fetched successfully', seat);
  }
}
