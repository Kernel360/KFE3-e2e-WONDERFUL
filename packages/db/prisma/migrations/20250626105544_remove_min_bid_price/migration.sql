/*
  Warnings:

  - You are about to drop the column `min_bid_price` on the `auction_prices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auction_prices" DROP COLUMN "min_bid_price";
