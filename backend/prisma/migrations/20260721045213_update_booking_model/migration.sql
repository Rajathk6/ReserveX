/*
  Warnings:

  - You are about to drop the `booking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_eventId_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_seatId_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_userId_fkey";

-- DropTable
DROP TABLE "booking";

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'RESERVED',
    "expiresAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "seatId" TEXT NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bookings_eventId_idx" ON "bookings"("eventId");

-- CreateIndex
CREATE INDEX "bookings_seatId_idx" ON "bookings"("seatId");

-- CreateIndex
CREATE INDEX "bookings_userId_idx" ON "bookings"("userId");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "seats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
