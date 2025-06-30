/*
  Warnings:

  - A unique constraint covering the columns `[user_id,item_id]` on the table `favorite_items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favorite_items_user_id_item_id_key" ON "favorite_items"("user_id", "item_id");
