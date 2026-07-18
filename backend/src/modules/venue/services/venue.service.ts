import { prisma } from '../../../config/database.js';
import { GenerateSeatRepository } from '../repositories/seat.respository.js';
import { VenueRepository } from '../repositories/venue.repository.js';
import { CreateVenueDTO, UpdateVenueDTO } from '../types/venue.type.js';
import { SeatGenerator } from '../utils/seatGenerator.js';

export class VenueService {
  constructor(
    private readonly venueRepository = new VenueRepository(),
    private readonly seatGenerator = new GenerateSeatRepository(),
  ) {}

  async getAll() {
    return this.venueRepository.findAll();
  }

  async get(id: string) {
    return this.venueRepository.findById(id);
  }

  async create(data: CreateVenueDTO) {
    return prisma.$transaction(async (tx) => {
      const venue = await this.venueRepository.create(
        {
          name: data.name,
          capacity: data.capacity,
          vipRows: data.vipRows,
          premiumRows: data.premiumRows,
          seatsPerRow: data.seatsPerRow,
          city: {
            connect: {
              id: data.cityId,
            },
          },
        },
        tx,
      );

      const seats = SeatGenerator.generate(
        venue.id,
        venue.capacity,
        venue.vipRows,
        venue.premiumRows,
        venue.seatsPerRow,
      );

      await this.seatGenerator.createManySeats(seats, tx);

      return venue;
    });
  }

  async update(id: string, data: UpdateVenueDTO) {
    return this.venueRepository.update(id, data);
  }

  async delete(id: string) {
    return this.venueRepository.delete(id);
  }
}
