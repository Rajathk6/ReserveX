/*
  Warnings:

  - Added the required column `seatsPerRow` to the `venues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "venues" ADD COLUMN     "seatsPerRow" INTEGER NOT NULL;
