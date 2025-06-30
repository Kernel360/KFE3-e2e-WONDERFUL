/*
  Warnings:

  - You are about to drop the column `url` on the `auction_images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auction_images" DROP COLUMN "url",
ADD COLUMN     "urls" TEXT[];
