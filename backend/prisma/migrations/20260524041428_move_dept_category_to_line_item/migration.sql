/*
  Warnings:

  - You are about to drop the column `category` on the `RfpRequest` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `RfpRequest` table. All the data in the column will be lost.
  - Added the required column `category` to the `LineItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `LineItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LineItem" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RfpRequest" DROP COLUMN "category",
DROP COLUMN "department";
