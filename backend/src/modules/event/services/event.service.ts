import { EventRepository } from '../repositories/event.respository.js';
import { CreateEventDTO, UpdateEventDTO } from '../types/event.type.js';

export class EventService {
  constructor(private readonly eventRepository = new EventRepository()) {}

  async create(dto: CreateEventDTO, organizerId: string) {
    return this.eventRepository.create({
      title: dto.title,
      description: dto.description,
      startTime: dto.startTime,
      endTime: dto.endTime,
      capacity: dto.capacity,
      venue: dto.venue,
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
    });
  }

  async getAll() {
    return this.eventRepository.findAll();
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
