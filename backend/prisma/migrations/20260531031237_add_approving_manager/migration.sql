/*
  Warnings:

  - You are about to drop the column `category` on the `LineItem` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `LineItem` table. All the data in the column will be lost.
  - You are about to drop the column `justification` on the `RfpRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LineItem" DROP COLUMN "category",
DROP COLUMN "department";

-- AlterTable
ALTER TABLE "RfpRequest" DROP COLUMN "justification",
ADD COLUMN     "approvingManagerId" INTEGER,
ADD COLUMN     "budgetYear" TEXT,
ADD COLUMN     "checkPayableTo" TEXT,
ADD COLUMN     "isCapitalJustification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isCheckRequest" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paymentAddress" TEXT,
ADD COLUMN     "paymentCity" TEXT,
ADD COLUMN     "paymentStateZip" TEXT,
ADD COLUMN     "repContactEmail" TEXT,
ADD COLUMN     "repContactName" TEXT,
ADD COLUMN     "repContactPhone" TEXT,
ADD COLUMN     "requestedFor" TEXT;

-- AddForeignKey
ALTER TABLE "RfpRequest" ADD CONSTRAINT "RfpRequest_approvingManagerId_fkey" FOREIGN KEY ("approvingManagerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
