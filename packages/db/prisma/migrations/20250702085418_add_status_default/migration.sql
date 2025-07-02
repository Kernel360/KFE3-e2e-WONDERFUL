/*
  Warnings:

  - You are about to alter the column `status` on the `auction_items` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "auction_items" ALTER COLUMN "status" SET DEFAULT 'ACTIVE',
ALTER COLUMN "status" SET DATA TYPE VARCHAR(20);
