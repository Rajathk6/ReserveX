import { VenueRepository } from '../../venue/repositories/venue.repository.js';
import { SeatRepository } from '../repositories/seat.repository.js';
import { SeatFilterDTO } from '../types/seat.type.js';

export class SeatService {
  constructor(
    private readonly seatRepository = new SeatRepository(),
    private readonly venueRepository = new VenueRepository(),
  ) {}

  async getByVenue(dto: SeatFilterDTO, id: string) {
    const venue = await this.venueRepository.findById(id);
    if (!venue) {
      throw new Error('Venue not found');
    }

    const { seats, total } = await this.seatRepository.getByVenue(venue.id, dto);

    return {
      seats,

      pagination: {
        page: dto.page,
        limit: dto.limit,
        total,
        totalPages: Math.ceil(total / dto.limit),
        hasNext: dto.page * dto.limit < total,
        hasPrevious: dto.page > 1,
      },
    };
  }

  async getById(venueId: string, seatId: string) {
    return await this.seatRepository.getById(venueId, seatId);
  }
}
