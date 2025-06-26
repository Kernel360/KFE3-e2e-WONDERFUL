/*
  Warnings:

  - Added the required column `min_bid_price` to the `auction_prices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auction_prices" ADD COLUMN     "is_instant_buy_enabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "min_bid_price" INTEGER NOT NULL;
