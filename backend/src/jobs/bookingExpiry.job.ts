import cron from 'node-cron';
import { BookingRepository } from '../modules/booking/repositories/booking.repository.js';

const bookingRepository = new BookingRepository();
export async function bookingExpiryJob() {
  cron.schedule('* * * * *', async () => {
    await bookingRepository.expireReservations();
  });
}
