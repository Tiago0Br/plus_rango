/*
  Warnings:

  - You are about to drop the column `subTotalPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalDiscounts` on the `Order` table. All the data in the column will be lost.
  - Added the required column `subtotalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDiscount` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "subTotalPrice",
DROP COLUMN "totalDiscounts",
ADD COLUMN     "subtotalPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "totalDiscount" DECIMAL(10,2) NOT NULL;
