import { Prisma, SeatCategory } from '@prisma/client';

export class SeatGenerator {
  static generate(
    venueId: string,
    capacity: number,
    vipRows: number,
    premiumRows: number,
    seatsPerRow: number,
  ): Prisma.SeatCreateManyInput[] {
    const seats: Prisma.SeatCreateManyInput[] = [];

    const totalRows = Math.ceil(capacity / seatsPerRow);

    let created = 0;

    for (let row = 0; row < totalRows; row++) {
      const rowLabel = String.fromCharCode(65 + row);

      let category: SeatCategory;

      if (row < vipRows) {
        category = SeatCategory.VIP;
      } else if (row < vipRows + premiumRows) {
        category = SeatCategory.PREMIUM;
      } else {
        category = SeatCategory.REGULAR;
      }

      for (let number = 1; number <= seatsPerRow; number++) {
        if (created === capacity) {
          break;
        }

        seats.push({
          venueId,

          row: rowLabel,

          number,

          label: `${rowLabel}${number}`,

          category,
        });

        created++;
      }
    }

    return seats;
  }
}
