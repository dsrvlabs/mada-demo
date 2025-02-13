/*
  Warnings:

  - You are about to drop the column `item` on the `TxHistory` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `TxHistory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `total` on the `TxHistory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "TxHistory" DROP COLUMN "item",
ADD COLUMN     "items" TEXT[],
ALTER COLUMN "amount" SET DATA TYPE INTEGER[],
ALTER COLUMN "total" SET DATA TYPE INTEGER;
