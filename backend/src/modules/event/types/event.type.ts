export interface CreateEventDTO {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  capacity: number;
  cityId: string;
  venue: string;
}

export type UpdateEventDTO = Partial<CreateEventDTO>;
