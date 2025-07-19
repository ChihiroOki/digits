/*
  Warnings:

  - You are about to drop the column `adress` on the `Contact` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firstName,lastName]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contact_firstName_lastName_key" ON "Contact"("firstName", "lastName");
