/*
  Warnings:

  - You are about to drop the column `statesId` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `new` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_statesId_fkey";

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "new" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "statesId",
ADD COLUMN     "addressId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "zipcode" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "statesId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_addressId_key" ON "Users"("addressId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_statesId_fkey" FOREIGN KEY ("statesId") REFERENCES "States"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
