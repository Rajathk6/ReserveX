import { EventStatus } from '@prisma/client';
import { AppError } from '../../../errors/appErrors.js';
import { EventRepository } from '../repositories/event.respository.js';
import { EventStatusRepository } from '../repositories/eventStatus.repository.js';

export class EventStatusService {
  constructor(
    private readonly eventStatusRepository = new EventStatusRepository(),
    private readonly eventRepository = new EventRepository(),
  ) {}
  async publish(id: string) {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      throw new AppError(404, 'Event not found');
    }
    if (event.status !== EventStatus.DRAFT) {
      throw new AppError(400, 'Only Draft events can be published');
    }

    return await this.eventStatusRepository.updateStatus(id, EventStatus.PUBLISHED);
  }

  async complete(id: string) {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      throw new AppError(404, 'Event not found');
    }
    if (event.status !== EventStatus.PUBLISHED) {
      throw new AppError(400, 'Only Published events can be completed');
    }

    return await this.eventStatusRepository.updateStatus(id, EventStatus.COMPLETED);
  }

  async cancel(id: string) {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      throw new AppError(404, 'Event not found');
    }
    if (event.status === EventStatus.COMPLETED) {
      throw new AppError(400, 'Completed events cannot be cancelled');
    }
    if (event.startTime < new Date()) {
      await this.eventStatusRepository.updateStatus(id, EventStatus.COMPLETED);
      throw new AppError(400, 'Event has already started');
    }

    return await this.eventStatusRepository.updateStatus(id, EventStatus.CANCELLED);
  }
}
