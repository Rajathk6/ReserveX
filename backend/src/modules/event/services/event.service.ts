import { EventRepository } from '../repositories/event.respository.js';
import { CreateEventDTO, EventFilterDTO, UpdateEventDTO } from '../types/event.type.js';

export class EventService {
  constructor(private readonly eventRepository = new EventRepository()) {}

  async create(dto: CreateEventDTO, organizerId: string) {
    return this.eventRepository.create({
      title: dto.title,
      description: dto.description,
      startTime: dto.startTime,
      endTime: dto.endTime,
      organizer: {
        connect: {
          id: organizerId,
        },
      },
      city: {
        connect: {
          id: dto.cityId,
        },
      },
      venue: {
        connect: {
          id: dto.venueId,
        },
      },
    });
  }

  async getAll(dto: EventFilterDTO) {
    const { events, total } = await this.eventRepository.findAll(dto);
    return {
      events,
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

  async get(id: string) {
    return this.eventRepository.findById(id);
  }

  async update(id: string, dto: UpdateEventDTO) {
    return this.eventRepository.update(id, dto);
  }

  async delete(id: string) {
    return this.eventRepository.delete(id);
  }
}
